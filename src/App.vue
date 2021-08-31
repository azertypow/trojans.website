<template>

  <div
      :class="{
        'is-home': isHome,
        'is-fixed-layout': isFixedLayout,
        'is-desk-width': isDeskWidth,
      }"
      class="v-app">
    <navigation/>

    <router-view
        v-slot="{ Component, route }"
    >
      <transition
          name="fade"
          mode="out-in"
      >
        <component :is="Component" />
      </transition>
      <div class="overlay-left"></div>
    </router-view>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from "vuex"
import {key} from "@/store"
import Navigation from "@/components/Navigation.vue"

export default defineComponent({
  name: 'App',

  components: {
    Navigation,
  },

  data () {
    return {
      transitionName: 'slide-left',
      store: useStore(key),
    }
  },

  computed: {
    isHome(): boolean {
      return this.$route.path === '/'
    },
    isDeskWidth(): boolean {
      return this.store.state.isDeskWidth
    },
    isFixedLayout(): boolean {
      return this.$route.path === '/About' && !this.isDeskWidth
    },
  },

  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },

});
</script>

<style lang="scss">
@import "./style/param";

$transition-duration: .5s;

.v-app {
  padding-bottom: $nav-height;
  min-height: 100vh;
  box-sizing: border-box;

  &.is-home {
    padding-bottom: 0;
  }

  &.is-fixed-layout{
    height: 100vh;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: $transition-duration;

  & ~ .overlay-left {
    display: block;
    transition: transform $transition-duration;
    //transition-timing-function: cubic-bezier(.33333,0,0,1);
    transition-timing-function: ease-in-out;
  }
}

.overlay-left {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: $site-color;
  transition: none;
  display: block;
  transform: translate3d(-100%, 0, 0);
  z-index: 1000000000;
}

.fade-leave-to ~ .overlay-left {
  transform: translate3d(0, 0, 0);
}

.fade-enter ~ .overlay-left {
  transform: translate3d(0, 0, 0);
}

.fade-enter-to ~ .overlay-left {
  transform: translate3d(100%, 0, 0);
}
</style>
