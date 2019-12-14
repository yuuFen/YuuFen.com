<template>
  <div id="content" style="height:100vh">
    <a @click="changeLang()" id="lang-config" :class="'lang-' + lang"></a>
    <div id="mobile">


    </div>
  </div>
</template>

<script>
import { getLang, setLang } from './assets/js/utils/lang'
export default {
  name: 'app',
  data() {
    return {
      lang: getLang(),
    }
  },
  methods: {
    changeLang() {
      const lang = this.lang === 'zh' ? 'en' : 'zh'
      setLang(lang)
    }
  }

}
</script>
