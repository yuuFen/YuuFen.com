<template>
  <div>
    <m-msg v-for="message in messages" :key="message.id" :message="message"></m-msg>
    <m-bottom-input v-bind="$attrs"></m-bottom-input>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {

  },
}
</script>
