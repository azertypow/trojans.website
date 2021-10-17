<template>
  <section class="v-view-home" @scroll="scrollInHomeView" ref="viewHome">
    <div class="v-view-home__img-intro">
      <img class="v-view-home__logo" src="../style/images/TrojansLogo--white.svg" alt="Trojan logo">
    </div>

    <div
        class="v-view-home__img-item"
        v-for="(imageHomeItem, key) of homeImages"
        :class="{'is-fixed': fixedItemInHomeViewerCounter >= key}"
    >
      <a
          v-if="imageHomeItem.Link"
          :href="imageHomeItem.Link"
          target="_blank"
      >
        <span>-></span>
      </a>
      <gallery
          :data="{image: imageHomeItem.Image}"
          :with-desc="false"
      />
    </div>

    <div
        v-if="store.state.isDeskWidth"
        class="v-view-home__nav"
    >
      <div
          class="v-view-home__nav__left"
          @click="moveImage('left')"
          v-if="showArrowLeft"
      >
        <img src="../style/images/arrow.svg" alt="navigation arrow left">
      </div>
      <div
          class="v-view-home__nav__right"
          @click="moveImage('right')"
          v-if="showArrowRight"
      >
        <img src="../style/images/arrow.svg" alt="navigation arrow right">
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key} from "@/store"
import {IApiHomeImage} from "@/api"
import Gallery from "@/components/Gallery.vue"
import {scrollElementTo} from "@/global/scrollTo"

export default defineComponent({

  name: 'ViewHome',
  components: {Gallery},
  data() {
    return {
      store: useStore(key),
      fixedItemInHomeViewerCounter: -1,
      showArrowLeft: false,
      showArrowRight: true,
    }
  },

  methods: {
    scrollInHomeView() {
      const viewHome = this.$refs.viewHome as HTMLElement

      const leftScrollPosition = viewHome.scrollLeft
      const screenWidth = viewHome.getBoundingClientRect().width

      this.fixedItemInHomeViewerCounter = Math.floor(leftScrollPosition / screenWidth) - 1

      const paddingArrowShow = 10

      this.showArrowLeft = viewHome.scrollLeft > paddingArrowShow
      this.showArrowRight = viewHome.scrollLeft < (viewHome.scrollWidth - viewHome.getBoundingClientRect().width - paddingArrowShow )
    },

    moveImage(position: "left"|"right"){

      const viewHome = this.$refs.viewHome as HTMLElement
      const orientation = position === "left" ? -1 : 1
      const nextItemViewerCounter = (this.fixedItemInHomeViewerCounter + 1) + 1 * orientation
      // viewHome.scrollLeft = viewHome.getBoundingClientRect().width * nextItemViewerCounter

      scrollElementTo({
        durationTime: .25,
        startingScrollPosition: viewHome.scrollLeft,
        valueToAddedOnScroll: (viewHome.getBoundingClientRect().width * nextItemViewerCounter) - viewHome.scrollLeft,
        elementToScroll: viewHome
      })

    },
  },

  computed: {
    homeImages(): IApiHomeImage[] | null {
      return this.store.state.homeImages
    }
  }

})
</script>

<style scoped lang="scss">
@import "../style/param";

.is-desk-width .v-view-home {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  //scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    display: none;
  }

  .v-view-home__img-intro,
  .v-view-home__img-item {
    box-sizing: border-box;
    width: 100%;
    flex-shrink: 0;
  }
}

.v-view-home__img-intro {
  width: 100%;
  height: 100vh;
  background: black;
  padding: 50px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    position: fixed;
    top: 0;
    left: 0;
    //mix-blend-mode: difference;
    user-select: none;
    pointer-events: none;
    z-index: 10 ;
  }
}

.v-view-home__nav__right,
.v-view-home__nav__left {
  position: fixed;
  transform: translate(0, -50%);
  width:  50px;
  height: 50px;
  cursor: pointer;
}

.v-view-home__nav__left {
  top: 50%;
  left: $gutter;
  > img {
    transform: rotate(180deg);
  }
}

.v-view-home__nav__right {
  top: 50%;
  right: $gutter;
}

</style>

<style lang="scss">
@import "../style/param";

.v-view-home__img-item {
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: 'Inter', Helvetica, Neue, sans-serif;

  > a {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    > span {
      position: absolute;
      top: $gutter / 2;
      right: $gutter / 2;
      color: $site-color;
      line-height: 1ex;
    }
  }

  > .v-gallery {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }


  &.is-fixed > .v-gallery {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -500;
  }
}

</style>
