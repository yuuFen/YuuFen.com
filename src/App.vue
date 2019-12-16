<template>
  <div id="content" style="height:100vh">
    <a @click="changeLang()" id="lang-config" :class="'lang-' + lang"></a>
    <div id="mobile">
      <div id="system-status">
        <div id="system-status-left" class="system-status-content">
          <m-status-signal></m-status-signal>
        </div>
        <div id="system-status-center" class="system-status-content">
          <m-status-time></m-status-time>
        </div>
        <div id="system-status-right" class="system-status-content">
        </div>
      </div>

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
    },
    resize() {
      const mobile = document.getElementById('mobile');

      if (window.innerWidth < 480) {
        // Mobile design
        mobile.style.width = '100%';
        mobile.style.height = '100%';
        mobile.style.marginLeft = '-50%';
        mobile.style.marginTop = '0';
        mobile.style.top = '0';
        return;
      }

      const margin = 15;
      let width = window.innerWidth - margin * 2;
      let height = window.innerHeight - margin * 2;

      const targetWidth = 750;
      const targetHeight = 1334;
      const ratio = targetWidth / targetHeight;

      if (width / height > ratio) {
        width = Math.round(height * ratio);
      }
      else {
        height = Math.round(width / ratio);
      }

      mobile.style.width = width + 'px';
      mobile.style.height = height + 'px';
      mobile.style.marginLeft = '-' + width / 2 + 'px';
      mobile.style.marginTop = '-' + height / 2 + 'px';
      mobile.style.top = '50%';
      mobile.style.left = '50%';
    }


  },
  mounted() {
    this.resize()
    addEventListener('resize', this.resize)
  }

}
</script>
