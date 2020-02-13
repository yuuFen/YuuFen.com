<template>
  <div class="fullscreen-img">
    <div class="fullscreen-mask" @click="close"></div>
    <slot></slot>
    <a class="fullscreen-close" href="javascript:;" @click="close"></a>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
