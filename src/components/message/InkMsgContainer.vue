<template>
  <div class="ink-msg-container">
    <m-msg-container ref="msgContainer" :choices="choices" :messages="messages" :isDialogOver="isDialogOver"></m-msg-container>
  </div>
</template>

<script>
import InkDialog from '../../assets/js/entities/inkDialog'
import Message from '../../assets/js/entities/message'
import SENDER from '../../assets/js/constants/sender'

export default {
  props: {
    inkFileName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      choices: [],
      isDialogOver: false,
      messages:[]
    }
  },
  methods: {
    appendMessage(msg) {
      this.messages.push(msg)
    },
    runNext() {
      let text = this.inkDialog.continue()
      if (text) {
        const sender = this.inkDialog.story.currentTags.indexOf('yuufen') > -1 ? SENDER.YUUFEN : SENDER.VISITOR

        if (sender === SENDER.VISITOR) {
          this.appendMessage(new Message(sender, text))
          this.runNext()
        } else {
          setTimeout(() => {
            this.appendMessage(new Message(sender, text))
            this.runNext()
          }, 2000)
        }
      } else {
        this.choices = this.inkDialog.story.currentChoices
      }
    },
    respond(choice) {
      this.choices = []
      this.inkDialog.story.ChooseChoiceIndex(choice.index)
      this.runNext()
    },
  },
  created() {
    this.$root.$on('respond', (choice) => {
      this.respond(choice)
    })

    this.inkDialog = new InkDialog()
    setTimeout(() => {
      // 等待app完全打开
      this.inkDialog.load(this.inkFileName, (hasHistory) => {
        if (!hasHistory) {
          this.runNext()
        }
      })
    }, 300)
  },
}
</script>
