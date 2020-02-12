import * as $ from 'n-zepto'
import * as ink from 'inkjs'
// import localStorage from 'localStorage' // 这个包有什么用？
import { isStale, updateStale } from '../utils/stale'

export default class InkDialog {
  constructor() {
    this.story = null
    this.fileName = null
  }
  load(fileName, callback) {
    this.fileName = fileName
 
    if (isStale()) {
      this.purgeState()
    }

    // 封装了的ajax，避免了使用require是打包到js中的可能性
    $.getJSON(`/dialogs/${fileName}.json`, (data) => {
      this.story = new ink.Story(data)

      if (this.hasState()) {
        this.loadState()
      }
      updateStale()

      if (typeof callback === 'function') {
        callback()
      }
    })
  }
  continue() {
    if (this.story.canContinue) {
      // 因为 Continue 和 appendMsg 间存在两秒间隔，如果save放在Continue后面，如果在那两秒间隔中退出，会丢失信息
      this.saveState()
      return this.story.Continue()
    } else {
      return null
    }
  }

  saveState() {
    const state = this.story.state.ToJson()
    localStorage.setItem(getStateKey(this.fileName), state)
  }
  loadState() {
    const state = localStorage.getItem(getStateKey(this.fileName))
    if (state && state !== 'null') {
      this.story.state.LoadJson(state)
      return true
    }
    return false
  }
  hasState() {
    const state = localStorage.getItem(getStateKey(this.fileName))
    return state && state !== 'null'
  }
  purgeState() {
    localStorage.setItem(getStateKey(this.fileName), null)
  }
}
function getStateKey(fileName) {
  if (!fileName) {
    console.warn('No fileName in getStateKey')
    return ''
  }
  return 'inkState' + fileName
}
