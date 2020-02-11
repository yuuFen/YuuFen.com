<template>
  <div ref="content" class="bottom-input" :style="`background-image: url(${bgImg})`">
    <div class="input-head">
      <div class="input-head-text" @click="togglePrompt">
        <span v-if="!isDialogOver && choices.length">说点什么……</span>
        <span v-else-if="!isDialogOver && !choices.length">等待栗子回复……</span>
        <span v-else-if="isDialogOver">栗子下线了，过些时候再来看看吧</span>
      </div>
      <a class="close-btn" @click="togglePrompt(false)" v-if="isPromptOpen"></a>
    </div>
    <div class="input-body" v-if="isPromptOpen">
      <ul class="choices">
        <li v-for="choice in choices" :key="choice.index">
          <a @click="respond(choice)">{{ choice.text }}</a>
        </li>
      </ul>
    </div>
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
      isPromptOpen: false,
      promptHeight: 45,
    }
  },
  methods: {
    togglePrompt(e) {
      if (this.choices.length && e) {
        this.isPromptOpen = true
      } else {
        this.isPromptOpen = false
      }
      this.$nextTick(() => {
        this.resize()
      })
    },
    respond(choice) {
      this.isPromptOpen = false
      this.$nextTick(() => {
        this.resize()
      })
      this.$root.$emit('respond', choice)
    },
    resize() {
      this.promptHeight = this.$refs.content ? this.$refs.content.clientHeight : 45
      this.bgImg = getPixelImage({
        width: this.$el.clientWidth,
        height: this.promptHeight,
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
