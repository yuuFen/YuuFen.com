<template>
  <div class="bottom-input" :style="`background-image: url(${bgImg})`">
    <h3 style="margin:10px" v-for="(choice, index) in choices" :key="index" @click="respond(choice)">{{ choice.text }}</h3>
  </div>
</template>

<script>
import { getPixelImage } from '../../assets/js/utils/image'
import colors from '../../assets/js/constants/colors'
export default {
  props: {
    choices: {
      type: Array,
      default: () => {},
    },
    isDialogOver: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bgImg: '',
    }
  },
  methods: {
    respond(choice) {
      this.$root.$emit('respond', choice)
    },
    resize() {
      this.bgImg = getPixelImage({
        width: this.$el.clientWidth,
        height: 45,
        radius: [0, 0, 3, 3],
        fillColor: colors.bg.lighter,
        borderSize: [0, 1, 1, 1],
        borderColor: colors.border,
      })
    },
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
}
</script>
