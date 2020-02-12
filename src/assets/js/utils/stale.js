import { WECHAT_MESSAGE_KEY_IN_STORAGE, MSG_DURATION } from '../constants/storage'

const CACHE_TIME_KEY = 'cacheTime'

export function isStale() {
  const lastTime = parseInt(localStorage.getItem(CACHE_TIME_KEY)) // 返回键值或 null
  const now = Date.now()
  const msgs = localStorage.getItem(WECHAT_MESSAGE_KEY_IN_STORAGE) // 返回键值或 null
  return (lastTime && now - lastTime > MSG_DURATION * 1000) || (!lastTime && msgs)
}

export function updateStale() {
  const now = Date.now()
  localStorage.setItem(CACHE_TIME_KEY, now)
}
