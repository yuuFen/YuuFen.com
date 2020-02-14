<template>
  <div class="mobile-inapp" :style="`background-image:url(${bodyBgImg})`">
    <div class="inapp-head" :style="`background-image:url(${headBgImg})`">
      <div class="inapp-head-center">{{ icons[appId].name[lang] }}</div>
      <div class="inapp-head-right" @click="exit">{{ lang === 'en' ? 'back' : '返回' }}</div>
    </div>
    <div class="inapp-body">
      <m-app-wechat v-if="appId === 'wechat'"></m-app-wechat>
      <m-app-album v-if="appId === 'album'"></m-app-album>
      <m-app-zhifubao v-if="appId === 'zhifubao'"></m-app-zhifubao>
      <m-app-comment v-if="appId === 'comment'"></m-app-comment>
    </div>
  </div>
</template>

<script>
import icons from '../../assets/js/configs/icons'
import { getLang } from '../../assets/js/utils/lang'
import { getPixelImage } from '../../assets/js/utils/image'
import themes from '../../assets/js/constants/themes'
import colors from '../../assets/js/constants/colors'

export default {
  props: {
    appId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      lang: getLang(),
      icons: icons,
      bodyBgImg: '',
      headBgImg: '',
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    exit() {
      this.$emit('exit')
    },
    resize() {
      const body = this.$el
      const bodytheme = icons[this.appId].appBgTheme
      const bodyColor = (() => {
        switch (bodytheme) {
          case themes.light:
            return colors.bg.lightest
          case themes.medium:
            return colors.bg.medium
          case themes.dark:
            return colors.bg.dark
          default:
            return colors.bg.light
        }
      })()
      this.bodyBgImg = getPixelImage({
        width: body.clientWidth,
        height: body.clientHeight,
        radius: 2,
        fillColor: bodyColor,
        margin: 1, // 留出border
      })

      const head = this.$el.getElementsByClassName('inapp-head')[0]
      const headTheme = icons[this.appId].appStatusTheme
      const headColor = (() => {
        switch (headTheme) {
          case themes.light:
            return colors.head.light
          case themes.medium:
            return colors.head.medium
          case themes.dark:
            return colors.head.dark
          default:
            return colors.head.dark
        }
      })()
      this.headBgImg = getPixelImage({
        width: head.clientWidth,
        height: head.clientHeight,
        radius: [2, 2, 0, 0],
        fillColor: headColor,
        margin: [1, 1, 0, 1],
      })
    },
  },
}
</script>
