<template>
  <div class="ink-msg-container">
    <m-msg-container ref="msgContainer" :choices="choices" :messages="messages" :isDialogOver="isDialogOver"></m-msg-container>
  </div>
</template>

<script>
import InkDialog from '../../assets/js/entities/inkDialog'
import Message from '../../assets/js/entities/message'
import SENDER from '../../assets/js/constants/sender'
import { WECHAT_MESSAGE_KEY_IN_STORAGE } from '../../assets/js/constants/storage'
import { isStale } from '../../assets/js/utils/stale'

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
      messages: [],
      isFirstMessage: true,
    }
  },
  methods: {
    appendMessage(msg) {
      if (!this.messages.length || !this.messages[this.messages.length - 1].isSame(msg)) {
        this.messages.push(msg)
        this.saveMessages()
      }
    },
    runNext() {
      let text = this.inkDialog.continue()
      if (text) {
        const sender = this.inkDialog.story.currentTags.indexOf('yuufen') > -1 ? SENDER.YUUFEN : SENDER.VISITOR

        if (sender === SENDER.VISITOR || this.isFirstMessage) {
          this.appendMessage(new Message(sender, text))
          this.isFirstMessage = false
          this.runNext()
        } else {
          setTimeout(() => {
            this.appendMessage(new Message(sender, text))
            this.runNext()
          }, 2000)
        }
      } else {
        this.choices = this.inkDialog.story.currentChoices
        if (!this.choices.length) {
          this.isDialogOver = true
        }
      }
    },
    respond(choice) {
      this.choices = []
      this.inkDialog.story.ChooseChoiceIndex(choice.index)
      this.runNext()
    },

    saveMessages() {
      const json = this.messages.map((msg) => msg.toJson())
      const str = JSON.stringify(json)
      localStorage.setItem(WECHAT_MESSAGE_KEY_IN_STORAGE, str)
    },
    loadMessages() {
      const str = localStorage.getItem(WECHAT_MESSAGE_KEY_IN_STORAGE)
      const json = JSON.parse(str) || []
      this.messages = json.map((msg) => {
        const obj = new Message()
        return obj.fromJson(msg)
      })
    },
    purgeMessages() {
      localStorage.setItem(WECHAT_MESSAGE_KEY_IN_STORAGE, null)
    },
  },
  created() {
    this.$root.$on('respond', (choice) => {
      this.respond(choice)
    })

    if (isStale()) {
      this.purgeMessages()
    } else {
      this.loadMessages()
    }
    
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
