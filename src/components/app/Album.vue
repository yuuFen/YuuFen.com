<template>
  <div class="inapp-album inapp-body-content padding" :class="{ scroll: !openImgSrc }">
    <div class="album-group" v-for="(group, index) in album" :key="index">
      <h3>{{ group.title[lang] }}</h3>
      <div class="album-group-content">
        <div class="album-photo-container" v-for="(photo, index) in group.photos" :key="index">
          <a href="" class="album-photo-img pixel-img" :style="`background-image: ${photo.thumbnail ? `url('${photo.thumbnail}')` : 'transparent'})`"></a>
        </div>
      </div>
    </div>
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
      album: [],
      openImgSrc: null,
    }
  },
  mounted() {
    this.album = album.map((group) => {
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
        img.src = obj.src // 一定要放在onload后面，不然IE会报错
      })
      return clonedGroups
    })
  },
}
</script>
