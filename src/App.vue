<template>

  <div
      :class="{
        'is-home': isHome,
        'is-fixed-layout': isFixedLayout,
        'is-desk-width': isDeskWidth,
        'show-nav': showNavInfo,
      }"
      class="v-app">
    <navigation/>

    <transition
        name="nav-inf-disappear"
    >
      <navigation-informations
          class="v-app-nav-inf"
          v-if="showNavInfo"
      />
    </transition>

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
import NavigationInformations from "@/components/navigation-informations.vue"

export default defineComponent({
  name: 'App',

  components: {
    NavigationInformations,
    Navigation,
  },

  data () {
    return {
      transitionName: 'slide-left',
      store: useStore(key),
    }
  },

  mounted() {
    window.addEventListener('mousemove', ev => {
      this.store.commit("updateMousePosition", {x: ev.clientX, y: ev.clientY})
    })
  },

  computed: {
    isHome(): boolean {
      return this.$route.path === '/'
    },
    isPorjects(): boolean {
      return this.$route.path === "/projects"
    },
    showNavInfo(): boolean {
      return this.store.state.topArrowNavInformationActive && this.isPorjects && this.isDeskWidth
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

.v-app {
  padding-bottom: $nav-height;
  box-sizing: border-box;
  min-height: 100vh;
  transition: padding ease-in-out .5s;

  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    display: none;
  }

  &.is-home {
    padding-bottom: 0;
  }

  &.is-fixed-layout{
    height: 100vh;
  }

  &.show-nav {
    padding-top: $line-height;
    padding-bottom: $nav-height - $line-height;
  }
}

.v-app-nav-inf {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: $page-transition--duration;

  & ~ .overlay-left {
    display: block;
    transition: transform $page-transition--duration;
    //transition-timing-function: cubic-bezier(.33333,0,0,1);
    transition-timing-function: $page-transition--timing-function;
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

.nav-inf-disappear-enter-active,
.nav-inf-disappear-leave-active {
  transition: transform ease-in-out .5s;
}

.nav-inf-disappear-leave,
.nav-inf-disappear-entre-to {
  transform: translate3d(0, 0, 0);
}
.nav-inf-disappear-leave-to,
.nav-inf-disappear-entre {
  transform: translate3d(0, -100%, 0);
}

</style>
