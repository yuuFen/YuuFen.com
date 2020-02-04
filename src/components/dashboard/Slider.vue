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
      <span class="slider-control-btn" v-for="page in pages" :key="page.id"></span>
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
    return {}
  },
  methods: {
    mouseDown() {},
    mouseMove() {},
    mouseUp() {},
    touchStart() {},
    touchMove() {},
    touchEnd() {},
  },
}
</script>
