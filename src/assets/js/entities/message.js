import { generateId } from '../utils/id'

export default class Message {
  constructor(sender,text) {
    this.id = generateId()
    this.sender = sender
    this.text = text
  }
}