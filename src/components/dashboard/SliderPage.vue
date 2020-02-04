<template>
  <div class="slider-page">
    <m-app-group v-for="group in appGroups" :key="group.title[lang]" :apps="group.apps" :title="group.title" v-bind="$attrs"> </m-app-group>
  </div>
</template>

<script>
import { getLang } from '../../assets/js/utils/lang'
export default {
  name: 'SliderPage',
  props: {
    appGroups: { type: Array, default: () => [] },
  },
  data() {
    return {
      lang: getLang(),
    }
  },
}
</script>
