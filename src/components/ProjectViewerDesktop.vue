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
        <div
            v-for="index in lengthOfItemProject"
            class="v-project-viewer-desktop__tab"
            @click="projectTabClicked(index - 1)"
            :class="{
              'is-active': isActiveTab(index - 1)
            }"
        >
          <span v-if="isActiveTab(index - 1) && index > 1" >✗</span>
          <span v-else-if="!isActiveTab(index - 1)" >↗</span>
        </div>

      </div>

    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType } from "vue"
import {IApiExhibition_links, IApiProject, IApiTags} from "@/api"
import Exhibition from "@/components/Exhibition.vue"
import {useStore} from "vuex"
import {IIndexOfOpenProject, IProjectsSortedInArray, key} from "@/store"
import Gallery, {IGalleryData} from "@/components/Gallery.vue"
import ToggleTable from "@/components/ToggleTable.vue"
import ProjectGalleryMobile from "@/components/ProjectGalleryMobile.vue"
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
    },
    index: {
      required: true,
      type: Object as PropType<{
        dateIndex: number,
        projectIndex: number,
      }>,
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.updateTitleWidth()
      this.upadteLeftSpaceData()
      this.upadateRightSpaceData()
      this.updateStoredWidthProjectOpen()
      this.updateStoredProjectOpenTitleWidth()

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
        this.store.commit("updateIndexOfOpenProject", null)
    },

    projectClicked(e: MouseEvent){

      if(this.thisIsOpen) {

        this.closeProject(e)

      } else {

        this.store.commit("updateIdOfOpenedProject", this.stringProjectId)
        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: this.$props.index.dateIndex,
          projectIndex: this.$props.index.projectIndex,
          itemIndex: 0,
        } as IIndexOfOpenProject)

      }

    },

    projectTabClicked(index: number) {

      const indexToSetup = this.isActiveTab(index) ? 0 : index

      this.store.commit("updateIndexOfOpenProject", {
        dateIndex: this.$props.index.dateIndex,
        projectIndex: this.$props.index.projectIndex,
        itemIndex: indexToSetup,
      } as IIndexOfOpenProject)
    },

    updateTitleWidth() {
      this.titleWidth = (this.$refs.title as HTMLElement).getBoundingClientRect().width
      this.titleStyle.width =  this.titleWidth + 'px'
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
        this.space.left =
            beforeThisElement.getBoundingClientRect().width
      }

      else this.space.left = 0
    },

    upadateRightSpaceData() {
      const thisElement = this.$el as HTMLElement
      const rightElementOnThisElement = thisElement.nextElementSibling

      if (
          rightElementOnThisElement === null
      ) {
        // get the next element because we want a project title on the left of the screen
        const secondRightElementWidth: number = (() => {

          if (thisElement.parentNode?.nextSibling instanceof HTMLElement)
            return thisElement.parentNode.nextSibling.firstElementChild?.getBoundingClientRect().width ?? 0
          return 0

        })()

        const thirdRightElementWidth: number = (() => {

          if (thisElement.parentNode?.nextSibling instanceof HTMLElement)
              return thisElement.parentNode.nextSibling.firstElementChild?.nextElementSibling?.getBoundingClientRect().width ?? 0
          return 0

        })()

        this.space.right = secondRightElementWidth + thirdRightElementWidth
      }

      else if (
          rightElementOnThisElement instanceof HTMLElement
      ) {
        this.space.right =
            rightElementOnThisElement.getBoundingClientRect().width
      }

      else this.space.right = 0
    },

    updateStoredWidthProjectOpen() {
      if(this.thisIsOpen)
        this.store.commit("updateWidthOfProjectOpen", window.innerWidth - this.space.left - this.space.right)
    },

    updateStoredProjectOpenTitleWidth() {
      if(this.thisIsOpen)
        this.store.commit("updateTitleWidthOfProjectOpen", this.titleWidth)
    },

    isActiveTab(tabIndax: number): boolean {
      return this.store.state.indexOfOpenProject?.itemIndex === tabIndax
    },
  },

  data() {
    return {
      store: useStore(key),
      titleWidth: 0,
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

    style(): any {
      return {
        width: (this.store.state.widthOfProjectOpen !== 0 && this.thisIsOpen) ? this.store.state.widthOfProjectOpen + 'px' : ""
      }
    },

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

    },

    projectsSortedInArray(): IProjectsSortedInArray {
      return this.store.getters.projectsSortedInArray
    },

    lengthOfItemProject(): number {
      return this.store.getters.projectsSortedInArray[this.$props.index.dateIndex][this.$props.index.projectIndex].length
    },
  },

  watch: {
    thisIsOpen() {
      if(!this.thisIsOpen) {
        this.updateStoredWidthProjectOpen()
        this.updateStoredProjectOpenTitleWidth()
      }
      else {
        window.setTimeout(
        () => {
          this.upadteLeftSpaceData()
          this.upadateRightSpaceData()

          this.updateStoredWidthProjectOpen()
          this.updateStoredProjectOpenTitleWidth()

          scrollElementTo({
            durationTime: .25,
            startingScrollPosition: document.getElementsByClassName("v-view-projects")[0].scrollLeft,
            valueToAddedOnScroll: (this.$refs.container as HTMLElement).getBoundingClientRect().left - this.space.left,
            elementToScroll: document.getElementsByClassName("v-view-projects")[0] as HTMLElement,
          })
          this.store.commit('updateLeftPositionOfProjectItem', (this.$el as HTMLElement).offsetLeft )
        }, 50)
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
  flex-shrink: 0;

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

  display: flex;
  width: 100%;
}

.v-project-viewer-desktop__tab {
  font-family: 'Inter', Helvetica, Neue, sans-serif;
  cursor: pointer;
  width: $gutter;
  flex-shrink: 0;
  text-align: center;
  color: $site-color;
  user-select: none;
  line-height: 1em;
  box-sizing: border-box;
  padding-top: $gutter / 4;

  &:not(:first-child) {
    box-shadow: -2px 0px 10px -5px #00000033;
  }

  &.is-active {
    width: 100%;
    flex-shrink: 1;
    text-align: right;
    line-height: .75em;
    box-shadow: none;
  }
}

</style>
