import Cookies from 'js-cookie'

const cookieKey = 'lang'

export function getLang () {
  const cookieLang = Cookies.get(cookieKey)
  // 第一次访问时cookieLang undefine,根据浏览器语言和用户语言判断lang
  const lang = cookieLang || navigator.language || navigator.userLanguage
  // lang = en-US
  return lang.indexOf('zh') > -1 ? 'zh' : 'en'
}

export function setLang (lang) {
  Cookies.set(cookieKey, lang)
  location.href = location.href
}