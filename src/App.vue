<template>

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
      transitionName: 'slide-left'
    }
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

#app {
  padding-bottom: $nav-height;
  min-height: 100vh;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: $transition-duration;

  & ~ .overlay-left {
    display: block;
    transition: transform $transition-duration;
    transition-timing-function: cubic-bezier(.33333,0,0,1);
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
  display: none;
  transform: translate3d(-100%, 0, 0);
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
