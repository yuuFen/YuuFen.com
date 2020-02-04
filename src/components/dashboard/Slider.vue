<template>
  <div
    class="slider"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    @mouseleave="mouseUp"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div class="slider-page-container">
      <m-slider-page v-for="page in pages" :key="page.id" :app-groups="page.groups" v-bind="$attrs"></m-slider-page>
    </div>
    <div class="slider-control">
      <span class="slider-control-btn" :class="{'selected': pageId === index}" v-for="(page, index) in pages" :key="page.id"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    pages: { type: Array, default: () => [] },
  },
  data() {
    return {
      pageId: 0,
      pageCount: null,
      pageContainer: null,
      isMouseDown: false,
      lastMoveX: null,
      lastDownX: null,
    }
  },
  mounted() {
    this.pageContainer = this.$el.getElementsByClassName('slider-page-container')[0]
    this.pageCount = this.pageContainer.childNodes.length
    this.scrollToPage(0)
  },
  methods: {
    mouseDown(e) {
      this.isMouseDown = true
      this.lastMoveX = e.clientX
      this.lastDownX = e.clientX
    },
    touchStart(e) {
      this.mouseDown(e.touches[0])
    },
    mouseMove(e) {
      if (this.isMouseDown) {
        this.scrollBy(this.lastMoveX - e.clientX)
        this.lastMoveX = e.clientX
      }
    },
    touchMove(e) {
      this.mouseMove(e.changedTouches[0])
    },
    mouseUp(e) {
      if (!this.isMouseDown) {
        return
      }
      if (this.lastDownX - e.clientX > 30) {
        ++this.pageId
      } else if (this.lastDownX - e.clientX < -30) {
        --this.pageId
      }
      if (this.pageId < 0) {
        this.pageId = 0
      } else if (this.pageId >= this.pageCount) {
        this.pageId = this.pageCount - 1
      }
      this.scrollToPage(this.pageId)
      this.isMouseDown = false
      this.lastMoveX = null
      this.lastDownX = null
    },
    touchEnd(e) {
      this.mouseUp(e.changedTouches[0])
    },
    scrollBy(dx) {
      this.pageContainer.scrollLeft += dx
    },
    scrollToPage(pageId) {
      const pageWidth = document.getElementsByClassName('slider-page')[0].clientWidth

      const timer = setInterval(() => {
        const target = pageWidth * pageId
        let step = (target - this.pageContainer.scrollLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step) // 滚动条的数值只能为整数
        this.scrollBy(step)
        if (this.isMouseDown || this.pageContainer.scrollLeft === target) {
          clearInterval(timer) // mouseUp的时候又会set一个计时器，所以这里mouseDown的作用相当于暂停
        }
      }, 5)
    },
  },
}
</script>
