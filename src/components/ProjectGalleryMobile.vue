<template>
  <section class="v-project-gallery-mobile">
    <div
        class="v-project-gallery-mobile__container"
        v-for="galleryData of images"
    >
      <Gallery
          :with-desc="true"
          :data="galleryData"
      ></Gallery>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Gallery, {IGalleryData} from "@/components/Gallery.vue"

export default defineComponent({

  name: 'ProjectGalleryMobile',
  components: {Gallery},
  props: {
    images: {
      type: Object as PropType<IGalleryData[]>,
      required: true,
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
  }

  .v-project-gallery-mobile__container {
    width: 100%;
    height: calc( 100vh - #{$nav-height} );
    flex-shrink: 0;
    overflow: hidden;
    scroll-snap-align: start;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    .v-gallery {
      height: 75%;
      flex-shrink: 0;
      flex-grow: 1;
      object-fit: contain;
      object-position: left bottom;
      background: black;
    }

    .v-gallery__desc {
      margin-bottom: 0 !important;
      padding-bottom: $gutter / 2;
      height: auto;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }
</style>
