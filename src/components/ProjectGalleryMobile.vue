<template>
  <section
      class="v-project-gallery-mobile"
      ref="projectViewer"
      @scroll="mobileGalleryScrolling"
  >

    <div
        class="v-project-gallery-mobile__container"
        v-for="galleryData of images"
        :style="projects__mobile_viewer__contentImageStyle.forContainer"
    >

      <div
          class="v-project-gallery-mobile__container--image"
          :style="projects__mobile_viewer__contentImageStyle.forChildren"
      >
        <Gallery
            :with-desc="true"
            :data="galleryData"
        ></Gallery>
      </div>

    </div>

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Gallery, {IGalleryData} from "@/components/Gallery.vue"
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({

  name: 'ProjectGalleryMobile',
  components: {Gallery},

  data() {
    return {
      store: useStore(key),
    }
  },

  props: {
    images: {
      type: Object as PropType<IGalleryData[]>,
      required: true,
    },
    desiredIndex: {
      type: Number,
      required: true,
    }
  },

  watch: {
    desiredIndex() {
      if(! (this.$refs.projectViewer instanceof HTMLElement) ) return

      this.$refs.projectViewer.scrollTo({
        left: this.desiredIndex * this.$refs.projectViewer.getBoundingClientRect().width,
        behavior: 'smooth',
      })
    }
  },

  computed: {

    projects__mobile_viewer__contentImageStyle(): any {

      if( this.store.getters.sizeOfFirstProjectImage && this.$refs.projectViewer instanceof HTMLElement) {

        const imageRation =
            this.store.getters.sizeOfFirstProjectImage.height / this.store.getters.sizeOfFirstProjectImage.width * 100

        let imageWidth = this.store.getters.transformDataOfDesktopItemProjectViewer.width

        const imageHeight = imageWidth * imageRation / 100
        const projectViewerHeight = this.$refs.projectViewer.getBoundingClientRect().height

        if(imageHeight > projectViewerHeight) {
          imageWidth = projectViewerHeight / imageRation * 100
        }

        return {
          forContainer: {
            width: imageWidth + 'px',
          },
          forChildren: {
            paddingTop: imageRation + '%',
          },
        }
      }

      return {}
    }


  },

  methods: {
    mobileGalleryScrolling() {
      const projectViewer = this.$refs.projectViewer as HTMLElement
      const projectViewerWidth = projectViewer.getBoundingClientRect().width

      const calculateIndexFromScroll = Math.floor( projectViewer.scrollLeft / projectViewerWidth )

      this.$emit('indexChange', calculateIndexFromScroll)
    },
  },

});
</script>

<style lang="scss">
@import "../style/param";

  .v-project-gallery-mobile {
    display: flex;
    flex: none;
    flex-wrap: nowrap;
    overflow: auto;
    align-items: flex-start;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .v-project-gallery-mobile__container {
    width: 100%;
    flex-shrink: 0;
    overflow: hidden;
    scroll-snap-align: start;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    padding-bottom: $gutter;


    .v-gallery__desc {
      margin-bottom: 0 !important;
      padding-bottom: $gutter / 2;
      padding-left: $gutter / 2;
      padding-right: $gutter / 2;
      height: auto;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  .v-project-gallery-mobile__container--image {
    position: relative;
    width: 100%;

    > .v-gallery {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }

</style>
