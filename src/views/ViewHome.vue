<template>
  <section class="v-view-home">
    <div class="v-view-home__img-intro">
      <img class="v-view-home__logo" src="../style/images/TrojansLogo--white.svg" alt="Trojan logo">
    </div>

    <div
        class="v-view-home__img-item"
        v-for="imageHomeItem of homeImages"
    >
      <a
          v-if="imageHomeItem.Link"
          :href="imageHomeItem.Link"
          target="_blank"
      >
        <span>go to -></span>
      </a>
      <gallery
          :data="{image: imageHomeItem.Image}"
          :with-desc="false"
      />
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key} from "@/store"
import {IApiHomeImage} from "@/api"
import Gallery from "@/components/Gallery.vue"

export default defineComponent({

  name: 'ViewHome',
  components: {Gallery},
  data() {
    return {
      store: useStore(key),
    }
  },

  computed: {
    homeImages(): IApiHomeImage[] | null {
      console.log( "homeImage", this.store.state.homeImages )
      return this.store.state.homeImages
    }
  }

})
</script>

<style scoped lang="scss">
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

</style>

<style lang="scss">
@import "../style/param";

.v-view-home__img-item {
  width: 100%;
  height: 100vh;
  position: relative;

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
      color: white;
      mix-blend-mode: difference;
    }
  }

  > .v-gallery {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>
