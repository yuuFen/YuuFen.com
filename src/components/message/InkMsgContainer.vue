<template>
  <div class="ink-msg-container">
    <m-msg-container></m-msg-container>
  </div>
</template>

<script>
import InkDialog from '../../assets/js/message/inkDialog'

export default {
  props: {
    inkFileName: {
      type: String,
      default: '',
    },
  },
  created() {
    const inkDialog = new InkDialog()
    setTimeout(() => {
      // 等待app完全打开
      inkDialog.load(this.inkFileName)
      
    }, 300)
  },
}
</script>
