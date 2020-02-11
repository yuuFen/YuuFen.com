import * as $ from 'n-zepto'
import * as ink from 'inkjs'
import localStorage from 'localStorage'

export default class InkDialog {
  constructor() {
    this.story = null
    this.fileName = null
  }
  load(fileName, callback) {
    this.fileName = fileName
    // 封装了的ajax，避免了使用require是打包到js中的可能性
    $.getJSON(`/dialogs/${fileName}.json`, (data) => {
      this.story = new ink.Story(data)

      if (typeof callback === 'function') {
        callback()
      }
    })
  }
  continue() {
    if (this.story.canContinue) {
      return this.story.Continue()
    } else {
      return null
    }
  }
}
