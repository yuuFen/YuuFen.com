<template>
  <div class="app" v-if="icons[appId]">
    <a class="app-icon" @click="appClick" :href="icons[appId].link || 'javascript:;'" :target="icons[appId].link ? '_blank' : '_self'" draggable="false">
      <div class="app-msg-counter pixel-img" :style="`background-image: url(${msgCountBgImg})`" v-if="msgCount">{{ msgCount }}</div>
      <div class="app-img-container">
        <div class="img app-img-content" :style="{ 'background-position': appIconPosition }"></div>
        <div class="img app-img-bg" :class="icons[appId].logoTheme"></div>
      </div>
    </a>
    <div class="app-name">{{ icons[appId].name[lang] }}</div>
  </div>
</template>

<script>
import icons from '../../assets/js/constants/icons'
import { getPixelImage } from '../../assets/js/utils/image'
import colors from '../../assets/js/constants/colors'
import { getLang } from '../../assets/js/utils/lang'
import { iconWidth } from '../../assets/js/constants/size'

export default {
  name: 'App',
  props: {
    appId: { type: String, default: () => '' },
  },
  data() {
    return {
      icons: icons,
      lang: getLang(),
      appIconPosition: '',
      msgCountBgImg: '',
      isWechatOpen: false,
    }
  },
  computed: {
    msgCount() {
      if (this.appId === 'wechat' && this.isWechatOpen === false) {
        return 1
      } else {
        return 0
      }
    },
  },
  mounted() {
    const pos = icons[this.appId].pos
    this.appIconPosition = -pos[0] * iconWidth + 'px ' + (-pos[1] * iconWidth + 'px')
    this.msgCountBgImg = getPixelImage({
      width: 20,
      height: 20,
      radius: 3,
      fillColor: colors.primaryLight,
      borderColor: colors.primaryDark,
      borderSize: 1,
      margin: 0,
    })
  },
  methods: {
    appClick(event) {
      // _gaq.push(['_trackEvent', 'Home', 'appClick', this.appId]);
      if (icons[this.appId].link) {
        return
      }
      if (this.appId === 'wechat') {
        this.isWechatOpen = true
      }

      this.$root.$emit('open-app', this.appId, event)
    },
  },
}
</script>
