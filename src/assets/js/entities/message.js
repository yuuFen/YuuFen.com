import { generateId } from '../utils/id'

export default class Message {
  constructor(sender, text) {
    this.id = generateId()
    this.sender = sender
    this.text = text
    this.isFromJson = false
  }

  isSame(msg) {
    return this.text === msg.text && this.sender === msg.sender
  }
  toJson() {
    return {
      id: this.id,
      sender: this.sender,
      text: this.text,
    }
  }
  fromJson(json) {
    this.id = json.id
    this.sender = json.sender
    this.text = json.text
    this.isFromJson = true
    return this
  }
}
