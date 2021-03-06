<template>
  <section
      :class="{
        'is-closed': !thisIsOpen,
        'is-hidden': !isActive,
      }"
      class="v-project"
      :style="style"
  >
<!--    <div-->
<!--        @click="closeProject"-->
<!--        class="v-project__close">✗</div>-->

    <div
        ref="container"
        class="v-project__container">

      <div
          ref="containerTitle"
          class="v-project__title"
          @click="projectClicked()"
      >
        <h1 class="t-title">
          {{ data.title }}
        </h1>
      </div>

      <toggle-table
          :has-close-ui="false"
          ref="firstTable"
          class="v-project__toggle-table"
          @toggled="tableToggled( -1, $event )"
          :is-open="getThisTableIsOpen(-1)"
      >
        <div
            v-if="data.description"
            class="v-project__description"
        >
          <div
              class="v-project__description-viewer"
          >
            <div
                ref="descriptionContainer"
                class="v-project__description-container"
                v-html="data.description"></div>
          </div>

        </div>

        <exhibition
            class="v-project__exhibitions"
            v-for="exhibition of exhibitions"
            :data="exhibition"
        />
      </toggle-table>

      <ProjectGalleryMobile
          class="v-project__no-toggle-table"
          :images="images"
      ></ProjectGalleryMobile>

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

export default defineComponent({

  name: 'Project',

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

    const maxChildrenElement  = 2
    const paragrapheMargin    = 20 //px unit

    this.$nextTick(() => {

      const descriptionContent = this.$refs.descriptionContainer

      this.updateHeaderFixedPositionOnScroll()
      window.addEventListener("scroll", this.updateHeaderFixedPositionOnScroll)

      // open first project in projectView.vue composant
      if (this.key == "0") {
        this.store.state.idOfOpenedProject = this.stringProjectId
      }

      if( this.thisIsOpen ) {
        this.updateStoredWidthProjectOpen()
        this.arrayOfToggleTableOpen = [ -1 ]
      }
    })


  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.updateHeaderFixedPositionOnScroll)
  },

  methods: {
    closeProject(e: MouseEvent) {
      if(this.thisIsOpen) {
        e.stopImmediatePropagation()
        this.store.state.idOfOpenedProject = null
      }
    },

    projectClicked(){
      this.store.state.idOfOpenedProject = this.stringProjectId

      window.setTimeout(() => {

        const framePerSecond = 60
        const durationTime = .25
        const totalFrameNumber = framePerSecond * durationTime
        const startingScrollPosition = document.getElementsByClassName("v-view-projects")[0].scrollLeft
        const valueToAddedOnScroll =
            (this.$refs.container as HTMLElement).getBoundingClientRect().left

        let frameNumber = 0

        function scrollPositionCalculation() {
          const currentScrollValue = easeLinear({
            time: frameNumber,
            duration: totalFrameNumber,
            startValue: startingScrollPosition,
            addedValue: valueToAddedOnScroll,
          })

          document.getElementsByClassName("v-view-projects")[0].scroll({
            top: 0,
            left: currentScrollValue,
          })

          frameNumber++

          if( frameNumber < totalFrameNumber )
            requestAnimationFrame(() => {
              scrollPositionCalculation()
            })
        }

        scrollPositionCalculation()


      }, 25)

    },

    updateHeaderFixedPositionOnScroll() {
      if (this.thisIsOpen && this.$refs.containerTitle instanceof HTMLElement) {
        console.log('fixed header position on scroll')
      }
    },

    updateHeight(heightOfOpenTable: number) {

      if( this.isMobileWidth ) {

        const toggleTableChildElement = (this.$refs.container as HTMLElement).querySelectorAll(".v-project__toggle-table")
        const noToggleTableChildElements = (this.$refs.container as HTMLElement).querySelectorAll(".v-project__no-toggle-table")

        const totalToggleTableHeaderHeight = toggleTableChildElement.length * 20

        let totalOfNoToggleHeightElement = 0

        noToggleTableChildElements.forEach(element => {
          totalOfNoToggleHeightElement += element.getBoundingClientRect().height
        })

        this.style.maxHeight =
            (this.$refs.containerTitle as HTMLElement).getBoundingClientRect().height
            + heightOfOpenTable
            + totalToggleTableHeaderHeight
            + totalOfNoToggleHeightElement
            + "px"

      } else {
        this.style.maxHeight = ""
      }

    },

    updateStoredWidthProjectOpen() {

      if( this.isDeskWidth ) {

        const projectCloseWidth = 63 //px unit

        this.style.maxWidth =
            window.innerWidth
            - projectCloseWidth * 2.5
            + "px"

      } else {
        this.style.maxWidth = ""
      }

    },

    getThisTableIsOpen(index: number): boolean {
      return this.arrayOfToggleTableOpen.includes(index)
    },

    tableToggled(index: number, $event: number) {
      this.updateHeight( $event )

      this.updateStoredWidthProjectOpen()

      if( index === -1 || this.getThisTableIsOpen(index) ) this.arrayOfToggleTableOpen = [ -1 ]
      else this.arrayOfToggleTableOpen = [ index ]
    },
  },

  data() {
    return {
      store: useStore(key),
      style: {
        maxHeight:  "",
        maxWidth:   "",
      },
      arrayOfToggleTableOpen: [] as number[],
    }
  },

  computed: {

    isDeskWidth(): boolean {
      return this.store.state.isDeskWidth
    },

    isMobileWidth(): boolean {
      return this.store.state.isMobileWidth
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

    }
  },

  watch: {
    thisIsOpen() {
      if( this.thisIsOpen && this.$refs["container"] instanceof HTMLElement) {
        this.arrayOfToggleTableOpen = [ -1 ]
        ;(this.$refs.firstTable as any).toggled()

      } else {
        // this.arrayOfToggleTableOpen = []
        this.style.maxHeight = ""
        this.style.maxWidth = ""
      }
    }
  },

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/grid";
@import "../style/typography";

.v-project {
  overflow: hidden;
  box-shadow:  $tile-box-shadow;
  transition: max-height 500ms ease-in-out;
  position: relative;
  max-height: $height-of-closed-project;
}

.v-project__close {
  @extend .t-title;
  @include gutter;
  font-family: 'Inter', Helvetica, Neue, sans-serif;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: $gutter / 2;
  right: 0;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  transform: rotate3d(0, 0, 1, 0);
  opacity: 1;
  font-size: 17px;
  color: $site-color;

  .v-project.is-closed & {
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }
}

.v-project__description {
  @include gutter;
}

.v-project__description-viewer {
  overflow: hidden;
  transition: max-height 500ms ease-in-out;
}

.v-project__description-container {
  overflow: hidden;

  + * {
    padding-top: 40px;
  }
}

.v-project__exhibitions {
  @include gutter;
}

.v-project__container {
  @include no-margin-for-first-and-last;
  overflow: hidden;
  background-color: $site-background-color;
}

.v-project__title {
  @include no-margin-for-first-and-last;

  padding: $gutter/2 3em $gutter/2 $gutter/2;
  user-select: none;

  .v-project.is-closed & {
    cursor: pointer;
  }
}

.v-project__toggle-table {
  opacity: 1;
  //transition: opacity 250ms ease-in-out 525ms;
  background: white;

  //&:nth-child(1) { transition-delay: 150ms }
  //&:nth-child(2) { transition-delay: 225ms }
  //&:nth-child(3) { transition-delay: 300ms }
  //&:nth-child(4) { transition-delay: 375ms }
  //&:nth-child(5) { transition-delay: 450ms }

  .is-closed & {
    opacity: 0;
  }

  .is-desk-width & {
    box-shadow: $tile-box-shadow;
  }
}

</style>

<style lang="scss">
@import "../style/param";
@import "../style/typography";
@import "../style/grid";

.v-project {
  .v-gallery__desc {
    margin-bottom: - $gutter + $small-line-height / 2;
  }
}

.v-project__description-container {
  @include no-margin-for-first-and-last;
}

.v-project__toggle-table {
  &:nth-child(2) {
    .v-toggle-table__header {
      box-shadow: none
    }


  }
}


.is-desk-width {
  $width-of-closed-project: $font-title-size + $gutter;

  .v-project {
    max-height: none !important;
    max-width: $width-of-closed-project;
    //transition: max-width 500ms ease-in-out;
  }

  .v-project__container {
    display: flex;
  }

  .v-project__title {
    writing-mode: vertical-rl;
    text-align: right;
    height: calc(100vh - #{$nav-height});
    box-sizing: border-box;
    padding-right: $gutter / 2;

    > * {
      margin: 0;
      transform: rotate3d(0, 0, 1, 180deg);
    }
  }

  .v-gallery {
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: right;
  }

  .v-view-home .v-gallery {
    object-fit: cover;
    object-position: center;
  }

  .v-gallery__desc {
    margin-top: 3px;
    text-align: right;
  }

}

</style>
