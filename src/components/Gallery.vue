<template>
    <img
        class="v-gallery"
        :class="{
          'has-vimeo': data.vimeo
        }"
        :alt="data.image.caption"
        :src="largeImgUrl"
        @click="openVimeoPlayer"
        v-if="!vimeoPlayerIsOpen"
    >
  <div
      class="v-gallery__desc"
      v-if="data.image.caption && withDesc"
  >
    {{data.image.caption}}
  </div>

  <div
      class="v-gallery__vimeo-container"
      v-if="data.vimeo && vimeoPlayerIsOpen"
  >

    <iframe :src="`https://player.vimeo.com/video/${data.vimeo.vimeo_id}?color=00EF2E&portrait=0`"
            width="250"
            height="150"
            frameborder="0"
            class="v-gallery__vimeo-container__vimeo"
            @load="vimeoLoad"
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

  data() {
    return {
      vimeoPlayerIsOpen: false
    }
  },

  computed: {
    largeImgUrl(): string {
      let imgData = this.data.image

      if( this.data.vimeo ) imgData = this.data.vimeo.cover

      const largeImagePath: string = imgData.formats?.xlarge?.url || imgData.formats?.large?.url || imgData.url || ""
      return `${API_BASE_URL}${largeImagePath}`
    },
  },

  methods: {
    openVimeoPlayer() {
      this.vimeoPlayerIsOpen = true
    },

    vimeoLoad( e: Event ) {
      if (e.target instanceof HTMLIFrameElement && e.target.getBoundingClientRect().width < 650) {
        const iframe = e.target
        iframe.style.opacity = "0"
        iframe.style.width = "1000px"
        iframe.style.height = "1000px"
        window.setTimeout(() => {
          iframe.style.opacity = ""
          iframe.style.width = ""
          iframe.style.height = ""
        }, 250)
      }
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
  position: relative;
}

.v-gallery__desc {
  @extend .t-text-small;
  margin-top: $small-line-height / 2;
  margin-bottom: $small-line-height / 2;
}

.v-gallery__vimeo-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;

  > .v-gallery__vimeo-container__vimeo {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

</style>
