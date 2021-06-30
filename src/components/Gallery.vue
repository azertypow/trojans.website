<template>
    <img
        class="v-gallery"
        :class="{
          'has-vimeo': data.vimeo
        }"
        :alt="data.image.caption"
        :src="largeImgUrl"
    >
  <div
      class="v-gallery__desc"
      v-if="data.image.caption && withDesc"
  >
    {{data.image.caption}}
  </div>

  <div
      class="v-gallery__vimeo-container"
      v-if="data.vimeo"
  >
    <iframe
        title="vimeo-player"
        :src="`https://player.vimeo.com/video/${data.vimeo.vimeo_id}`"
        width="640"
        height="360"
        frameborder="0"
        allowfullscreen
    ></iframe>
  </div>

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {API_BASE_URL, IApiImage, IAPiVimeo} from "@/api"

export interface IGalleryData {
  image: IApiImage
  vimeo?: IAPiVimeo
}

export default defineComponent({

  name: 'Gallery',

  props: {
    data: {
      required: true,
      type: Object as PropType<IGalleryData>,
    },
    withDesc: {
      required: false,
      type: Boolean,
      default: () => true,
    }
  },

  computed: {
    largeImgUrl(): string {
      let imgData = this.data.image

      if( this.data.vimeo ) imgData = this.data.vimeo.cover

      const largeImagePath: string = imgData.formats?.large?.url || imgData.url || ""
      return `${API_BASE_URL}${largeImagePath}`
    },
  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/typography";

.v-gallery {
  display: block;
  width: 100%;
  height: auto;
}

.v-gallery__desc {
  @extend .t-text-small;
  margin-top: $small-line-height / 2;
  margin-bottom: $small-line-height / 2;
}

</style>
