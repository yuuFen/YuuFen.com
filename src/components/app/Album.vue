<template>
  <div class="inapp-album inapp-body-content padding" :class="{ scroll: !openedImgSrc }">
    <div class="album-group" v-for="(group, index) in photos" :key="index">
      <h3>{{ group.title[lang] }}</h3>
      <div class="album-group-content">
        <div class="album-photo-container" v-for="(photo, index) in group.photos" :key="index">
          <a
            class="album-photo-img pixel-img"
            :style="{ 'background-image': photo.thumbnail ? `url('${photo.thumbnail}')` : 'transparent' }"
            @click="openImg(photo)"
          ></a>
        </div>
      </div>
    </div>
    <m-fullscreen-img v-if="openedImgSrc" @close="closeOpenedImg()">
      <!-- <img :src="openedImgSrc" class="fullscreen-content" /> -->
      <canvas v-if="hasThumbnailCanvas" ref="thumbnailCanvas" class="pixel-img fullscreen-content"></canvas>
    </m-fullscreen-img>
  </div>
</template>

<script>
import album from '../../assets/js/configs/album'
import { getLang } from '../../assets/js/utils/lang'
import ImageProcessor from '../../assets/js/entities/imageProcessor'

const thumbnailSize = 32
const imageProcessor = new ImageProcessor()

export default {
  data() {
    return {
      lang: getLang(),
      photos: album,
      openedImgSrc: null,
      hasThumbnailCanvas: false,
    }
  },
  methods: {
    openImg(photo) {
      this.openedImgSrc = photo.src
      this.hasThumbnailCanvas = true

      this.$nextTick(() => {
        const canvas = this.$refs.thumbnailCanvas
        canvas.width = photo.thumbnailWidth
        canvas.height = photo.thumbnailHeight

        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
          ctx.globalCompositeOperation = 'destination-out'

          const duration = 1000
          const start = Date.now()

          let frameCnt = 0
          const render = () => {

          }

          
        }
        img.src = photo.thumbnail
      })
    },
    closeOpenedImg() {
      this.openedImgSrc = null
      this.hasThumbnailCanvas = false
    },
  },
  mounted() {
    setTimeout(() => {
      this.photos = album.map((group) => {
        const clonedGroups = Object.assign({}, group)
        clonedGroups.photos = clonedGroups.photos.map((url) => {
          return {
            src: url,
            thumbnail: null,
          }
        })
        clonedGroups.photos.forEach((obj) => {
          const img = new Image()
          img.onload = () => {
            let width = img.width
            let height = img.height
            // 保持比例缩小
            if (width > height) {
              width = (thumbnailSize / height) * width
              height = thumbnailSize
            } else {
              height = (thumbnailSize / width) * height
              width = thumbnailSize
            }
            obj.thumbnailWidth = width
            obj.thumbnailHeight = height
            obj.thumbnail = imageProcessor.doSunglass(img, width, height)
          }
          img.src = obj.src // 执行到这一句开始加载图片，一定要放在onload后面，不然IE会报错（第二次打开在有缓存时执行顺序出错）
        })
        return clonedGroups
      })
    }, 400)
  },
}
</script>
