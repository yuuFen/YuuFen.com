<template>
  <div class="app-group" :style="`background-image: url(${appGroupBgImg})`">
    <div class="app-group-title" :style="`background-image: url(${appGroupTitleImg})`">{{ title[lang] }}</div>
    <div class="app-group-content">
      <m-app v-for="appId in apps" :key="appId" :app-id="appId"></m-app>
    </div>
  </div>
</template>

<script>
import { getPixelImage } from '../../assets/js/utils/image'
import colors from '../../assets/js/constants/colors'
import { getLang } from '../../assets/js/utils/lang'

export default {
  name: 'AppGroup',
  props: {
    title: { type: Object, default: () => '' },
    apps: { type: Array, default: () => [] },
    width: { type: Number, default: () => null },
  },
  data() {
    return {
      lang: getLang(),
      appGroupTitleImg: '',
      appGroupBgImg: '',
    }
  },
  watch: {
    width: 'resize'
  },
  methods: {
    resize() {
      const group = this.$el

      this.appGroupBgImg = getPixelImage({
        width: group.clientWidth,
        height: group.clientHeight,
        radius: 2,
        fillColor: colors.appGroup,
      })
      const title = group.getElementsByClassName('app-group-title')[0]
      this.appGroupTitleImg = getPixelImage({
        width: title.clientWidth,
        height: title.clientHeight,
        radius: [2, 2, 0, 0],
        fillColor: colors.appGroupTitle,
      })
    },
  },
}
</script>
