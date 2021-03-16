<template>
  <nav class="v-navigation">

    <div
        v-if="isClose"
        class="v-navigation__menu">
      <div class="v-navigation__logo">
        <img alt="trojan logo"
             src="../style/images/TrojansLogo.svg">
      </div>
    </div>

    <div
        v-if="isOpen"
        class="v-navigation__content"
    >
      <div
          class="v-navigation__links"
      >
        <router-link class="t-nav-link" @click="closeMenu" to="/">Home</router-link>
        <router-link class="t-nav-link" @click="closeMenu" to="/About">About</router-link>
        <router-link class="t-nav-link" @click="closeMenu" to="/projects">Projects</router-link>
      </div>
    </div>

    <div
        @click="toggleMenu"
        :class="{'is-open': isOpen}"
        class="v-navigation__toggle">toggle icon</div>

  </nav>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({

  name: 'Navigation',

  data() {
    return {
      store: useStore(key)
    }
  },

  computed: {
    isOpen(): boolean {
      return this.store.state.menuIsOpen
    },

    isClose(): boolean {
      return !this.store.state.menuIsOpen
    },

    currentRouteName(): string | symbol | undefined | null {
      return this.$router.currentRoute.value.name
    },
  },

  methods: {
    toggleMenu() {
      this.store.state.menuIsOpen = !this.store.state.menuIsOpen
    },

    closeMenu() {
      this.store.state.menuIsOpen = false
    },
  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/grid";

.v-navigation {
  position: fixed;
  z-index: 1000;
  left: 0;
  bottom: 0;
  height: $height;
  background: $site-background-color;
  width: 100%;
  user-select: none;
}

.v-navigation__menu {
  @include column-container;
  box-shadow: $tile-box-shadow;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}

.v-navigation__content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $site-color;
  padding-top: $gutter;
  @include gutter;
}

.v-navigation__links {
  @include column-container;

  > * {
    @include column();
    @include gutter;
  }

}

.v-navigation__logo {
  height: 100%;
  width: 100%;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center left;
  }
}

.v-navigation__toggle {
  @include gutter;
  transition: color 1s ease-in-out;
  padding-bottom: $gutter;
  padding-top: $gutter;
  position: fixed;
  bottom: 0;
  right: 0;

  &.is-open {
    color: white;
  }
}

</style>
