<template>
  <div class="msg-row" :class="'msg-' + message.sender">
    <div class="msg" ref="msg" :style="`background-image: url(${bgImg})`">
      <p>{{ msgContent }}</p>
    </div>
  </div>
</template>

<script>
import SENDER from '../../assets/js/constants/sender'
import { getPixelImage } from '../../assets/js/utils/image'
import colors from '../../assets/js/constants/colors'
export default {
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      msgContent: '',
      bgImg: '',
    }
  },
  watch: {
    msgContent: function() {
      this.$nextTick(() => {
        this.resize()
      })
    },
  },
  methods: {
    resize() {
      const isYuuFen = this.message.sender === SENDER.YUUFEN
      const el = this.$refs.msg
      this.bgImg = getPixelImage({
        width: el.clientWidth,
        height: el.clientHeight,
        radius: isYuuFen ? [0, 3, 3, 3] : [3, 0, 3, 3],
        fillColor: isYuuFen ? colors.bg.lightest : colors.bg.mediumDarker,
        borderColor: isYuuFen ? '#948a7c' : '#645f5b',
      })
    },
  },
  mounted() {
    if (!this.message.isFromJson && this.message.sender === SENDER.YUUFEN) {
      this.msgContent = '.'
      setTimeout(() => {
        this.msgContent = '..'
      }, 500)
      setTimeout(() => {
        this.msgContent = '...'
      }, 1000)
      setTimeout(() => {
        this.msgContent = this.message.text
      }, 1500)
    } else if (this.message.isFromJson) {
      this.msgContent = this.message.text
      setTimeout(() => {
        this.resize()
      }, 200)
      setTimeout(() => {
        this.resize()
      }, 300)
      setTimeout(() => {
        this.resize()
      }, 500)
      setTimeout(() => {
        this.resize()
      }, 1000)
    } else {
      this.msgContent = this.message.text
    }

    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
}
</script>
