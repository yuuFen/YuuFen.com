<template>
  <div>
    <h1>{{ message.text }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
