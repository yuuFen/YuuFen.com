import themes from './themes'

export default {
  douban: {
    name: {
      zh: '豆瓣',
      en: 'Douban',
    },
    pos: [0, 0],
    logoTheme: themes.medium,
    link: 'https://www.douban.com/',
  },
  bilibili: {
    name: {
      zh: 'Bilibili',
      en: 'Bilibili',
    },
    pos: [1, 0],
    logoTheme: themes.dark,
    link: 'https://space.bilibili.com/',
  },
  weibo: {
    name: {
      zh: '微博',
      en: 'Weibo',
    },
    pos: [1, 1],
    logoTheme: themes.light,
    link: 'https://weibo.com/',
  },
  zhihu: {
    name: {
      zh: '知乎',
      en: 'Zhihu',
    },
    pos: [3, 1],
    logoTheme: themes.light,
    link: 'https://www.zhihu.com/',
  },
  github: {
    name: {
      zh: 'GitHub',
      en: 'GitHub',
    },
    pos: [0, 2],
    logoTheme: themes.light,
    link: 'https://github.com/',
  },
  dribbble: {
    name: {
      zh: 'Dribbble',
      en: 'Dribbble',
    },
    pos: [2, 0],
    logoTheme: themes.medium,
    link: 'https://dribbble.com/',
  },
  email: {
    name: {
      zh: 'Email',
      en: 'Email',
    },
    pos: [1, 2],
    logoTheme: themes.medium,
    appStatusTheme: themes.light,
    link: 'mailto:me@yuufen.com',
  },
  blog: {
    name: {
      zh: '博客',
      en: 'Blog',
    },
    pos: [3, 2],
    logoTheme: themes.light,
    link: 'http://yuufen.com/blog/',
  },
  comment: {
    name: {
      zh: '留言',
      en: 'Comments',
    },
    pos: [3, 5],
    logoTheme: themes.dark,
    appStatusTheme: themes.dark,
  },
  wechat: {
    name: {
      zh: '微信',
      en: 'Wechat',
    },
    pos: [0, 1],
    logoTheme: themes.dark,
  },
}
