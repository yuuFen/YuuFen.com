<template>
  <div>
    <a @click="changeLang()" id="lang-config" :class="'lang-' + lang"></a>
    <div id="mobile" :class="'status-theme-' + statusTheme" :style="`background-image: url(${mobileBgImg})`">
      <div id="system-status">
        <div id="system-status-left" class="system-status-content">
          <m-status-signal></m-status-signal>
        </div>
        <div id="system-status-center" class="system-status-content">
          <m-status-time></m-status-time>
        </div>
        <div id="system-status-right" class="system-status-content"></div>
      </div>
      <!-- end of header -->

      <!-- 绝对定位的padding-box + padding, 实现子元素content占满父元素剩余高度 -->
      <div class="dashboard" @touchmove.prevent>
        <m-slider :pages="pages" :width="mobileWidth"></m-slider>
        <div class="dashboard-bottom" :style="`background-image:url(${mobileBottomBgImg})`">
          <m-app app-id="wechat"></m-app>
          <m-app app-id="album"></m-app>
          <m-app app-id="zhifubao"></m-app>
          <m-app app-id="github"></m-app>
        </div>
      </div>
      <!-- TO DO: 优化 Album 的加载 -->
      <m-inapp v-if="inApp" :app-id="inAppId" @exit="exitApp"></m-inapp>
      <div class="toast-wrap">
        <span class="toast-msg"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getLang, setLang } from './assets/js/utils/lang'
import colors from './assets/js/constants/colors'
import { getPixelImage } from './assets/js/utils/image'
import pagesConfig from './assets/js/configs/pages'
import icons from './assets/js/configs/icons'

const openAppDuration = 0.3

function setInAppAnimation(startX, startY, startW, startH, startOp, endX, endY, endW, endH, endOp) {
  const target = document.getElementsByClassName('mobile-inapp')[0]
  target.style['transition-duration'] = '0'
  target.style.left = startX + 'px'
  target.style.top = startY + 'px'
  target.style.width = startW
  target.style.height = startH
  target.style.opacity = startOp

  setTimeout(() => {
    target.style['transition-duration'] = openAppDuration + 's'
    target.style.left = endX + 'px'
    target.style.top = endY + 'px'
    target.style.width = endW
    target.style.height = endH
    target.style.opacity = endOp
  })
}

function toast(msg) {
  setTimeout(function() {
    document.getElementsByClassName('toast-wrap')[0].getElementsByClassName('toast-msg')[0].innerHTML = msg
    var toastTag = document.getElementsByClassName('toast-wrap')[0]
    toastTag.className = toastTag.className.replace('toastAnimate', '')
    setTimeout(function() {
      toastTag.className = toastTag.className + ' toastAnimate'
    }, 100)
  })
}

export default {
  name: 'app',
  data() {
    return {
      lang: getLang(),
      mobileWidth: null,
      pages: pagesConfig,
      mobileBgImg: '',
      mobileBottomBgImg: '',
      inApp: false,
      inAppId: null,
      lastAppOpenPosition: [0, 0],
      statusTheme: 'default',
    }
  },
  created() {
    this.$root.$on('open-app', (appId, event) => {
      this.openApp(appId, event)
    })
  },
  mounted() {
    // 阻止手机的实体返回键
    const that = this
    let first = null
    history.pushState(null, null, location.href)
    window.addEventListener('popstate', function(event) {
      //此处加入回退时你要执行的代码
      if (that.inApp) {
        history.pushState(null, null, location.href)
        // 不知道为什么异步顺畅一点
        setTimeout(() => {
          that.exitApp()
        })
      } else {
        if (first === null) {
          first = Date.now()
          toast('再按一次退出应用')
          setTimeout(() => {
            history.pushState(null, null, location.href)
            first = null
          }, 1000)
        }
      }
    })

    this.resizeMobile()
    this.resizeMobileBgImg()
    window.addEventListener('resize', this.resizeMobile)
    window.addEventListener('resize', this.resizeMobileBgImg)
  },
  methods: {
    openApp(name, event) {
      this.inApp = true
      this.inAppId = name

      this.$nextTick(() => {
        // 需要等InApp创建后才能操作它
        const mobile = document.getElementById('mobile')
        const mobileLeft = mobile.offsetLeft
        const mobileTop = mobile.offsetTop

        this.statusTheme = icons[name].appStatusTheme || 'dark'
        const x = event.clientX - mobileLeft
        const y = event.clientY - mobileTop
        setInAppAnimation(x, y, '0', '0', '0', '0', '0', '100%', '100%', '1')
        this.lastAppOpenPosition = [x, y]
      })
    },
    exitApp() {
      const x = this.lastAppOpenPosition[0]
      const y = this.lastAppOpenPosition[1]
      setInAppAnimation('0', '0', '100%', '100%', '1', x, y, '0', '0', '0')

      setTimeout(() => {
        // 等setInAppAnimation执行完后再销毁InApp
        this.inApp = false
        this.statusTheme = 'default'
        this.inAppId = null
      }, openAppDuration * 1000)
    },
    changeLang() {
      const lang = this.lang === 'zh' ? 'en' : 'zh'
      setLang(lang)
    },
    resizeMobile() {
      const mobile = document.getElementById('mobile')

      if (window.innerWidth <= 480) {
        // mobile设备时这里就return了,所以把绘制代码放在下面不会执行,
        // 所以另外新加了一个监听
        mobile.style.width = '100%'
        mobile.style.height = '100%'
        mobile.style.marginLeft = '-50%'
        mobile.style.marginTop = '0'
        mobile.style.top = '0'
        mobile.style.left = '50%'
        this.mobileWidth = mobile.clientWidth
        return
      }
      const margin = 15
      let width = window.innerWidth - margin * 2
      let height = window.innerHeight - margin * 2

      const targetWidth = 750
      const targetHeight = 1334
      const ratio = targetWidth / targetHeight // 目标宽高比

      if (width / height > ratio) {
        // 如果太宽
        width = Math.round(height * ratio)
      } else {
        //如果太高
        height = Math.round(width / ratio)
      }
      mobile.style.width = width + 'px'
      mobile.style.height = height + 'px'
      this.mobileWidth = mobile.clientWidth

      // 使元素的定位标识点在元素的正中间
      mobile.style.marginLeft = '-' + width / 2 + 'px'
      mobile.style.marginTop = '-' + height / 2 + 'px'
      // 移动元素的定位标识点至body的正中间
      mobile.style.top = '50%'
      // mobile.style.left = '50%'
    },
    resizeMobileBgImg() {
      const mobile = document.getElementById('mobile')
      this.mobileBgImg = getPixelImage({
        width: mobile.clientWidth,
        height: mobile.clientHeight,
        radius: 3,
        fillColor: colors.bg.light,
        borderColor: colors.border,
      })

      const bottom = document.getElementsByClassName('dashboard-bottom')[0]
      this.mobileBottomBgImg = getPixelImage({
        width: bottom.clientWidth,
        height: bottom.clientHeight,
        radius: [0, 0, 2, 2],
        fillColor: colors.appGroup,
        margin: [0, 1, 1, 1],
      })
    },
  },
}
</script>
