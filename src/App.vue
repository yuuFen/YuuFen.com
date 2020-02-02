<template>
  <div id="content" style="height:100vh">
    <a @click="changeLang()" id="lang-config" :class="'lang-' + lang"></a>
    <div id="mobile" :style="`background-image: url(${mobileBgImg})`">
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
      <div class="dashboard">
        test
      </div>
    </div>
  </div>
</template>

<script>
import { getLang, setLang } from './assets/js/utils/lang'
import colors from './assets/js/constants/colors'
import { getPixelImage } from './assets/js/utils/image'

export default {
  name: 'app',
  data() {
    return {
      lang: getLang(),
      mobileBgImg: '',
    }
  },
  methods: {
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

      // 使元素的定位标识点在元素的正中间
      mobile.style.marginLeft = '-' + width / 2 + 'px'
      mobile.style.marginTop = '-' + height / 2 + 'px'
      // 移动元素的定位标识点至body的正中间
      mobile.style.top = '50%'
      mobile.style.left = '50%'
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
    },
  },
  mounted() {
    this.resizeMobile()
    this.resizeMobileBgImg()
    window.addEventListener('resize', this.resizeMobile)
    window.addEventListener('resize', this.resizeMobileBgImg)
  },
}
</script>
