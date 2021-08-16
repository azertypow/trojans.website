<template>
  <section
      :class="{
        'is-open': thisIsOpen,
        'is-close': !thisIsOpen,
        'is-hidden': !isActive,
      }"
      class="v-project-viewer-desktop"
      :style="style"
  >

    <div
        ref="container"
        class="v-project-viewer-desktop__container"
    >

      <div
          ref="containerTitle"
          class="v-project-viewer-desktop__title"
          @click="projectClicked($event)"
          :style="titleStyle"
      >

        <h1 class="t-title"
            ref="title"
        >
          {{ data.title }}
        </h1>

      </div>

      <div
          class="v-project-viewer-desktop__content"
      >

        <div>desc content or image or vimeo</div>

      </div>

    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType } from "vue"
import {IApiExhibition_links, IApiProject, IApiTags} from "@/api"
import Exhibition from "@/components/Exhibition.vue"
import {useStore} from "vuex"
import {key} from "@/store"
import Gallery, {IGalleryData} from "@/components/Gallery.vue"
import ToggleTable from "@/components/ToggleTable.vue"
import ProjectGalleryMobile from "@/components/ProjectGalleryMobile.vue"
import {easeLinear} from "@/lib/easing"
import {scrollElementTo} from "@/global/scrollTo"

export default defineComponent({

  name: 'ProjectViewerDesktop',

  components: {ProjectGalleryMobile, ToggleTable, Gallery, Exhibition},

  props: {
    data: {
      type: Object as PropType<IApiProject>,
      required: true,
    },
    stringProjectId: {
      type: String as PropType<string>,
      required: true,
    },
    key: {
      type: String,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.updateWidth()
      this.updateTitleWidth()

      window.addEventListener("resize", this.updateTitleWidth)

    })
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateTitleWidth)
  },

  methods: {
    closeProject(e: MouseEvent) {
        e.stopImmediatePropagation()
        this.store.commit("updateIdOfOpenedProject", null)
    },

    projectClicked(e: MouseEvent){

      if(this.thisIsOpen) {

        this.closeProject(e)

      } else {

        this.store.commit("updateIdOfOpenedProject", this.stringProjectId)

        window.setTimeout(() => {

          this.upadteLeftSpaceData()
          this.updateWidth()

          scrollElementTo({
            durationTime: .25,
            startingScrollPosition: document.getElementsByClassName("v-view-projects")[0].scrollLeft,
            valueToAddedOnScroll: (this.$refs.container as HTMLElement).getBoundingClientRect().left - this.space.left,
            elementToScroll: document.getElementsByClassName("v-view-projects")[0] as HTMLElement,
          })

        }, 25)

      }

    },

    updateTitleWidth() {
      this.titleStyle.width = (this.$refs.title as HTMLElement).getBoundingClientRect().width + 'px'
    },

    upadteLeftSpaceData() {
      const thisElement = this.$el as HTMLElement
      const beforeThisElement = thisElement.previousElementSibling

      if (
          beforeThisElement instanceof HTMLElement
          && beforeThisElement.classList.contains('v-view-projects__year')
      ) {
        // get the before element because we want a project title on the left of the screen
        const secondBeforeElementWidth: number = (() => {

          if (beforeThisElement.parentNode?.previousSibling instanceof HTMLElement)
            return beforeThisElement.parentNode.previousSibling.lastElementChild?.getBoundingClientRect().width ?? 0
          return 0

        })()

        this.space.left = beforeThisElement.getBoundingClientRect().width + secondBeforeElementWidth
      }

      else if (
          beforeThisElement instanceof HTMLElement
      ) {
        this.space.left = beforeThisElement.getBoundingClientRect().width
      }

      else this.space.left = 0
    },

    updateWidth() {
      if(this.thisIsOpen) {
        const thisElement = this.$el as HTMLElement

        const beforeThisElement = thisElement.previousElementSibling
        const afterThisElement = thisElement.nextElementSibling

        this.style.width = window.innerWidth - this.space.left + 'px'

      } else {

        // this.style.width = this.$refs.containerTitle

      }
    },
  },

  data() {
    return {
      store: useStore(key),
      style: {
        width:   "",
      },
      titleStyle: {
        width: "0px",
      },
      space: {
        left: 0,
        right: 0,
      }
    }
  },

  computed: {

    exhibitions(): IApiExhibition_links[] {
      return this.data.exhibition_links || []
    },

    images(): IGalleryData[] {

      const data = []

      if( this.data.images ) {

        for(const galleryImage of this.data.images) {
          data.push({
            image: galleryImage
          } as IGalleryData)
        }
      }

      if(this.data.Vimeo) {
        for(const galleryVimeo of this.data.Vimeo) {
          data.push({
            image: {},
            vimeo: galleryVimeo
          } as IGalleryData)
        }
      }

      return data

    },

    thisIsOpen(): boolean {
      return this.stringProjectId === this.store.state.idOfOpenedProject
    },

    isActive(): boolean {
      if(this.data.tags) {

        const tagFilterValue = this.store.state.activatedTags.every((tagValue: string, index, array) => {
          for (const tag of (this.data.tags as IApiTags[] ) ) {
            if (tag.tags === tagValue) return true
          }
          return false
        })

        const secondaryTagFilterValue =
            this.store.state.activatedSecondaryTag ?
                this.store.state.activatedSecondaryTag === this.data.second_tag?.value
                : true

        return tagFilterValue && secondaryTagFilterValue

      } else {
        return true
      }

    }
  },

  watch: {
    thisIsOpen() {
      if( this.thisIsOpen && this.$refs["container"] instanceof HTMLElement) {

      } else {
        this.style.width = ""
      }
    }
  },

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/grid";
@import "../style/typography";

.v-project-viewer-desktop {
  overflow: hidden;
  box-shadow:  $tile-box-shadow;
  position: relative;
  height: calc( 100vh - #{$nav-height} );
}

.v-project-viewer-desktop__title {
  @include no-margin-for-first-and-last;

  user-select: none;
  height: calc(100vh - #{$nav-height});
  width: auto;
  box-sizing: border-box;
  position: relative;

  > * {
    margin: 0;
    position: absolute;
    top: 0;
    right: 100%;
    transform: rotate3d(0, 0, 1, -90deg);
    transform-origin: top right;
    width: calc(100vh - 65px);
    text-align: right;
    word-break: break-word;
    box-sizing: border-box;
    padding-right: $gutter / 2;
    padding-top: $gutter / 2;
    max-width: 10em;
  }
}

.v-project-viewer-desktop__container {
  @include no-margin-for-first-and-last;
  overflow: hidden;
  background-color: $site-background-color;
  display: flex;
}

.v-project-viewer-desktop__content {
  .is-close & {
    display: none;
  }
}

</style>
