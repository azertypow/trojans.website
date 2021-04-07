<template>
  <nav
      class="v-navigation"
      :class="{'is-open': isOpen}"
  >

    <div
        v-if="isOpen"
        class="v-navigation__content"
    >
      <div
          class="v-navigation__content__box"
      >
        <div
            class="v-navigation__links"
        >
          <router-link class="t-nav-link" @click="closeMenu" to="/">Home</router-link>
          <router-link class="t-nav-link" @click="closeMenu" to="/About">About</router-link>
          <router-link class="t-nav-link" @click="closeMenu" to="/projects">Projects</router-link>
        </div>

        <div
            class="v-navigation__contact"
            v-if="contactData !== null"
        >

          <p>Address:
            <br>{{contactData.Address}}
            <br>{{contactData.Postal_Code}} {{contactData.City}}
            <br>{{contactData.Country}}
          </p>

          <p>Mail:
            <br><a :href="`mailto:${contactData.mail}`">{{contactData.mail}}</a>
          </p>

          <p>
            <a
                v-for="(link, index) of contactData.links"
                :href="link.url"
            >
              <template v-if="index > 0"> | </template>
              {{link.name}}
            </a>
          </p>
        </div>

      </div>
    </div>

    <div
        class="v-navigation__menu">
      <div class="v-navigation__logo">
        <img alt="trojan logo"
             src="../style/images/TrojansLogo.svg">
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
import {IApiContact} from "@/api"

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

    contactData(): null | IApiContact {
      return this.store.state.contact
    }
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
  height: $nav-height;
  background: $site-background-color;
  width: 100%;
  user-select: none;

  &.is-open {
    background: $site-color;
  }
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
  box-sizing: border-box;
  padding-bottom: $nav-height;
}

.v-navigation__content__box {
  @include gutter;
  padding-top: $gutter;
  background: $site-color;
  position: relative;
  width: 100%;
  height: 100%;
}

.v-navigation__links {
  @include column-container;

  > * {
    @include column();
    @include gutter;
  }

}

.v-navigation__contact {
  @include no-margin-for-first-and-last;
  position: absolute;
  bottom: 0;
  color: white;
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
