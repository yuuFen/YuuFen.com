<template>
  <div>
    <h3 v-for="(choice, index) in choices" :key="index" @click="respond(choice)">{{ choice.text }}</h3>
  </div>
</template>

<script>
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
  methods: {
    respond(choice) {
      this.$root.$emit('respond',choice)
    }
  },
}
</script>
