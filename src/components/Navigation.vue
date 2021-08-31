<template>
  <nav
      class="v-navigation"
      :class="{
        'is-open': isOpen,
        'show-news': showNews,
      }"
  >

    <transition
        name="slide"
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
            <router-link class="t-nav-link" @click="closeMenu" to="/projects">Works</router-link>
            <router-link class="t-nav-link" @click="closeMenu" to="/About">About</router-link>
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

            <p><a :href="`mailto:${contactData.mail}`">{{contactData.mail}}</a></p>

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
    </transition>


    <div
        class="v-navigation__menu">
      <div class="v-navigation__logo">
        <div
            class="v-navigation__news t-text-subtitle"
            v-if="showNews">
          <div>news</div>
          <div
              class="v-navigation__news__content"
              v-if="news !== null"
              ref="newsElementContainer"
          >
            <div
                class="v-navigation__news__content__html"
                v-html="news"
                ref="newsElement"
            ></div>
          </div>
        </div>

        <a
            href="/"
            v-else
            class="no-style"
        >
          <svg
              version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px" y="0px"
              viewBox="0 0 595.3 220.7" style="enable-background:new 0 0 595.3 220.7;" xml:space="preserve">
            <g>
              <path d="M62.7,44h19.7v30.8h26v16.7h-26v39.2c0,3.8,0.1,6.8,0.3,9c0.2,2.2,0.9,4.1,2.1,5.8c1.2,1.6,3,2.3,5.6,2.1l18-1.8v16.7
                l-4.3,0.5c-1.4,0.2-4.6,0.6-9.6,1.2c-4.9,0.6-8.5,0.8-10.8,0.8c-5.8,0-10.7-2.1-14.8-6.2c-4.1-4.1-6.2-11.1-6.2-21V91.5H42.3V74.8
                h12c2.7,0,4.6-0.5,5.8-1.4c1.2-0.9,1.9-2.2,2.2-3.7c0.3-1.5,0.4-3.7,0.4-6.6V44z"/>
              <path d="M139,94c2.4-5.6,6.4-10.1,11.8-13.8c5.4-3.6,11.3-5.4,17.6-5.4v21.7h-16.7c-3.7,0-6.5,1.3-8.6,3.9
                c-2.1,2.6-3.1,7.1-3.1,13.4v48.5h-20V74.8h21.7L135,94H139z"/>
              <path d="M191.5,159.3c-6.4-3.7-11.4-9-15.1-15.9c-3.7-6.9-5.5-15.3-5.5-24.9c0-9.6,1.8-17.8,5.5-24.8c3.7-7,8.7-12.3,15.1-15.9
                c6.4-3.6,13.7-5.4,21.9-5.4c8.1,0,15.4,1.8,21.8,5.5c6.4,3.7,11.5,9,15.2,15.9c3.7,6.9,5.5,15.2,5.5,24.8c0,9.7-1.8,18-5.5,24.9
                c-3.7,6.9-8.7,12.3-15.2,15.9c-6.4,3.7-13.7,5.5-21.8,5.5C205.2,164.8,197.9,163,191.5,159.3z M197.3,95.6
                c-3.7,5.3-5.6,12.9-5.6,22.9s1.9,17.6,5.6,22.9c3.7,5.3,9.1,7.9,16.1,7.9c7,0,12.4-2.6,16.1-7.9c3.7-5.3,5.6-12.9,5.6-22.9
                s-1.9-17.6-5.6-22.9c-3.7-5.3-9.1-7.9-16.1-7.9C206.4,87.6,201,90.3,197.3,95.6z"/>
              <path d="M264.6,74.8h19.7V171c0,9.9-2.1,16.9-6.2,21c-4.1,4.1-9.1,6.2-14.8,6.2c-2.3,0-5.9-0.4-10.7-1.3c-1-0.1-2.2-0.3-3.5-0.5
                c-1.3-0.2-2.9-0.4-4.8-0.7v-18.3l12.3,2c3.7,0.6,5.9-0.6,6.8-3.6c0.8-2.9,1.3-7.1,1.3-12.4V74.8z M274.6,60.6
                c3.7,0,6.8-1.3,9.4-3.9c2.6-2.6,3.9-5.8,3.9-9.4c0-3.7-1.3-6.8-3.9-9.4c-2.6-2.6-5.8-3.9-9.4-3.9s-6.8,1.3-9.4,3.9
                c-2.6,2.6-3.9,5.8-3.9,9.4c0,3.7,1.3,6.8,3.9,9.4C267.8,59.3,270.9,60.6,274.6,60.6z"/>
              <path d="M360,80.7c6.7,5.6,10,13.5,10,23.6v58h-20.8l8.7-21.5h-5.7c-1.2,7.1-4.3,12.9-9.3,17.3c-5,4.4-11.2,6.7-18.5,6.7
                c-6.6,0-12.2-1.3-16.9-3.8c-4.7-2.6-8.3-5.9-10.8-10.2c-2.4-4.2-3.7-8.7-3.7-13.5c0-7.8,3-13.8,8.9-17.9c5.9-4.2,14-6.7,24.1-7.6
                l24-2.2v-6.8c0-4.4-1.4-8.1-4.2-11.1c-2.8-2.9-6.8-4.4-12.2-4.4c-3.9,0-7,0.2-9.3,0.7c-2.3,0.4-4.3,1.7-5.9,3.7
                c-1.6,2-2.4,5.2-2.4,9.5h-20c0-10.4,3.6-17.9,10.8-22.3c7.2-4.4,15.6-6.6,25-6.6C343.9,72.3,353.3,75.1,360,80.7z M344.4,144.2
                c3.7-3.8,5.6-8.7,5.6-14.8v-6.7l-21.5,2.2c-9.8,0.9-14.7,5.1-14.7,12.7c0,3.3,1.2,6.2,3.6,8.7c2.4,2.4,5.7,3.7,9.9,3.7
                C335,149.8,340.7,147.9,344.4,144.2z"/>
              <path d="M453.2,81.7c5.1,6.3,7.7,14.1,7.7,23.6v57h-20v-57c0-4.6-1.5-8.3-4.6-11.3c-3.1-2.9-7.8-4.4-14.3-4.4
                c-13.6,0-20.3,4.7-20.3,14v58.7h-20V74.8h20.8L395.8,94h3.8c2-6.1,5.9-11.3,11.6-15.4c5.7-4.2,12-6.3,18.8-6.3
                C440.3,72.3,448.1,75.4,453.2,81.7z"/>
              <path d="M524.5,138.3c0-3.1-1.1-5.6-3.3-7.3c-2.2-1.8-4.7-2.8-7.6-3.2l-15.3-1.8c-8.4-1-15.3-3.6-20.4-7.9
                c-5.2-4.3-7.8-10.1-7.8-17.6c0-8.7,3.1-15.5,9.2-20.6c6.1-5.1,14.4-7.6,24.8-7.6c6.6,0,12.6,1.1,18.3,3.3
                c5.6,2.2,10.1,5.6,13.6,10.3c3.4,4.6,5.2,10.3,5.2,17.1h-18.8c0-6.1-1.6-10.4-4.8-12.9s-7.9-3.8-14.1-3.8c-4.2,0-7.7,1.1-10.5,3.2
                c-2.8,2.1-4.2,4.9-4.2,8.5c0,3.2,1.1,5.9,3.2,8c2.1,2.1,5.3,3.4,9.5,3.8l18,2c7.3,0.9,13.1,3.4,17.3,7.6c4.2,4.2,6.3,9.6,6.3,16.4
                c0,5.8-1.6,10.9-4.7,15.3c-3.1,4.4-7.5,7.8-13.2,10.2c-5.7,2.4-12.2,3.6-19.5,3.6c-10.6,0-19.4-2.5-26.5-7.4
                c-7.1-4.9-10.7-12.8-10.7-23.6h18.8c0,6.3,1.7,10.8,5,13.3c3.3,2.5,8.6,3.8,15.8,3.8c5,0,8.9-1.2,11.8-3.5
                C523.1,145,524.5,142,524.5,138.3z"/>
            </g>
            </svg>
        </a>

      </div>

      <tags-list
          v-if="isDeskWidth && isProjectView"
      ></tags-list>

    </div>


    <div
        v-if="isMobileWidth"
        @click="toggleMenu"
        :class="{'is-open': isOpen}"
        class="v-navigation__toggle">

      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           x="0px"
           y="0px"
           viewBox="0 0 65 65"
           class="v-navigation__toggle-icon"
           xml:space="preserve">
        <path d="M 18 43 48 43 z"/>
        <path d="M 18 32 48 32 z"/>
        <path d="M 18 21 48 21 z"/>
      </svg>
    </div>

    <div
        v-if="isDeskWidth"
        class="v-navigation__toggle v-navigation__toggle__fix"
    >
      <router-link class="t-nav-link" @click="closeMenu" to="/">Home</router-link>
      <router-link class="t-nav-link" @click="closeMenu" to="/projects">Works</router-link>
      <router-link class="t-nav-link" @click="closeMenu" to="/About">About</router-link>
      <router-link class="t-nav-link" @click="closeMenu" to="/Manifesto">Manifesto</router-link>
    </div>

  </nav>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key} from "@/store"
import {IApiContact} from "@/api"
import TagsList from "@/components/TagsList.vue"

export default defineComponent({

  name: 'Navigation',
  components: {TagsList},
  data() {
    return {
      store: useStore(key),
      scrollTop: 0,
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", (e) => {
        this.scrollTop = window.scrollY;
      })
      this.initNewsAnimation()
    })
  },

  computed: {
    actualRout(): string {
      return this.$route.path
    },

    navigationOverHomeIntroLogo(): boolean {
      return this.scrollTop < 250 && this.actualRout === '/'
    },

    showNews(): boolean {
      return this.actualRout === '/' && !this.isOpen
    },

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
    },

    news(): string | null {
      if( this.store.state.info?.activated === false ) return null
      return this.store.state.info?.infos || null
    },

    isProjectView(): boolean {
      return this.$route.path === '/projects'
    },

    isMobileWidth(): boolean {
      return this.store.state.isMobileWidth
    },

    isDeskWidth(): boolean {
      return this.store.state.isDeskWidth
    },
  },

  methods: {
    toggleMenu() {
      this.store.state.menuIsOpen = !this.store.state.menuIsOpen
    },

    closeMenu() {
      this.store.state.menuIsOpen = false
    },

    initNewsAnimation() {
      window.setInterval( () => {
        if(this.$route.path === "/") {
          const newsElementContainer = this.$refs.newsElementContainer
          const newsElement = this.$refs.newsElement

          if(newsElement instanceof HTMLElement && newsElementContainer instanceof HTMLElement) {
            const containerSize = newsElementContainer.getBoundingClientRect()
            const contentSize   = newsElement.getBoundingClientRect()

            const contentOverflowContainer = contentSize.height > containerSize.height
            const bottomElementIsUnderBottomContainer = contentSize.bottom > containerSize.bottom

            const needScrollToBottom  = contentOverflowContainer && bottomElementIsUnderBottomContainer
            const needScrollToZero    = contentOverflowContainer && !bottomElementIsUnderBottomContainer

            const contentLineHeight = Number.parseFloat( getComputedStyle(newsElement).lineHeight )

            if( needScrollToBottom )  {
              newsElement.style.transition = "transform ease-in-out 500ms"
              newsElement.style.transform = `translateY( ${contentSize.top - containerSize.top - contentLineHeight}px )`
            } else if( needScrollToZero ) {
              newsElement.style.transition = "transform ease-in-out 0ms"
              newsElement.style.transform = `translateY( 0 )`
            }
          }
        }
      }, 2500)
    }
  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/typography";
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

  &.show-news {
    background: transparent;

    .v-navigation__menu {
      box-shadow: none;
    }

    .v-navigation__news {
      color: $site-background-color;
    }
  }
}

.v-navigation__menu {
  display: flex;
  flex-wrap: nowrap;
  box-shadow: $tile-box-shadow;
  height: 100%;
  flex-direction: row;
  justify-content: left;
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
  bottom: $gutter;
  color: white;
}

.v-navigation__logo {
  height: 100%;
  padding-right: $gutter;

  > a {
    display: block;
    height: 100%;

    > svg {
      width: auto;
      height: 100%;
      fill: $site-color;
      transition: fill ease-in-out 250ms;
    }
  }

  .is-open & {
    > svg {
      fill: $site-background-color;
    }
  }
}

.v-navigation__toggle {
  transition: color 1s ease-in-out;
  position: fixed;
  bottom: 0;
  right: 0;
  user-select: none;
  height: $nav-height;

  > svg {
    display: block;
    height: 100%;
    width: auto;
    fill: $site-color;
  }

  .is-home & > svg {
    stroke: white;
  }

  &.is-open {
    color: white;

    > svg {
      fill: $site-background-color;
    }
  }
}

.v-navigation__toggle__fix {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;

  > * {
    @include gutter;
    @extend .t-text-subtitle;
    margin: 0;
    color: $site-color;
    display: block;
    height: auto;
    line-height: 1em;
    transition: color linear 250ms;
  }
}

.v-navigation__toggle-icon {
  fill: none;
  stroke: $site-color;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  opacity: 1;

  path {
    transition: transform ease-in-out 150ms, opacity ease-in-out 150ms;
    transform-origin: center;
    transform: rotate3d(0, 0, 1, 0) translate(0, 0);
  }

  .is-open & {
    stroke: $site-background-color;

    path:nth-child(1) {
      transform: rotate3d(0, 0, 1, 45deg) translate(0%, -12px);
    }

    path:nth-child(2) {
      opacity: 0;
    }

    path:nth-child(3) {
      transform: rotate3d(0, 0, 1, -45deg) translate(0%, 12px);
    }
  }
}

.v-navigation__news {
  @include gutter;
  color: black;
  padding-right: $nav-height;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  padding-bottom: $gutter / 2;
  justify-content: flex-end;
}

.v-navigation__news__content {
  height: $news-content-height;
  overflow: hidden;
  //overflow: scroll;
}

</style>

<style lang="scss" >
@import "../style/param";
@import "../style/grid";
@import "../style/typography";

.v-navigation__news__content__html {
  @include no-margin-for-first-and-last;

  p {
    @extend .t-text-small;
  }

  img {
    display: inline-block;
    height: $news-content-height;
    vertical-align: bottom;
  }
}

.v-navigation {
  .v-tag-list {
    width: 100%;
  }
}

.slide-enter-active,
.slide-leave-active {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  transition: transform .75s ease-in-out;
}

.slide-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

</style>
