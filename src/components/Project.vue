<template>
  <section
      :class="{'is-closed': !thisIsOpen}"
      class="v-project"
      :style="style"
  >
    <div
        @click="closeProject"
        class="v-project__close">✗</div>

    <div
        ref="container"
        class="v-project__container">

      <div
          ref="containerTitle"
          class="v-project__title"
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
              :style="descriptionViewerStyle"
          >
            <div
                ref="descriptionContainer"
                class="v-project__description-container"
                v-html="data.description"></div>
          </div>

          <button
              v-if="showReadMoreButton"
              class="v-project__description__more"
              @click="toggleDescriptionView"
          >{{ readMoreButtonText }}</button>
        </div>

        <exhibition
            class="v-project__exhibitions"
            v-for="exhibition of exhibitions"
            :data="exhibition"
        />
      </toggle-table>

      <toggle-table
          class="v-project__toggle-table"
          v-for="(image, index) of images"
          @toggled="tableToggled(index, $event)"
          :is-open="getThisTableIsOpen(index)"
      >
        <Gallery
            :data="image"
        />
      </toggle-table>


    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType } from "vue"
import {IApiExhibition_links, IApiImage, IApiProject} from "@/api"
import Exhibition from "@/components/Exhibition.vue"
import {useStore} from "vuex"
import {key} from "@/store"
import Gallery from "@/components/Gallery.vue"
import ToggleTable from "@/components/ToggleTable.vue"

export default defineComponent({

  name: 'Project',
  components: {ToggleTable, Gallery, Exhibition},
  props: {
    data: {
      type: Object as PropType<IApiProject>,
      required: true,
    },
    stringProjectId: {
      type: String as PropType<string>,
      required: true,
    },
  },

  mounted() {

    const maxChildrenElement  = 2
    const paragrapheMargin    = 20 //px unit

    this.$nextTick(() => {

      const descriptionContent = this.$refs.descriptionContainer

      if(
          descriptionContent instanceof HTMLElement
          && descriptionContent.children.length > maxChildrenElement
      ) {

        this.hasLongContent = true

        for (
            let childrenKey = 0;
            childrenKey < maxChildrenElement;
            childrenKey++
        ) {
          this.minHeightForLongContent +=
              descriptionContent.children[ childrenKey ].getBoundingClientRect().height
          + (maxChildrenElement - 1) * paragrapheMargin
        }

        this.descriptionViewerStyle.maxHeight = this.minHeightForLongContent + "px"
      }
    })
  },

  methods: {
    closeProject(e: MouseEvent) {
      if(this.thisIsOpen) {
        e.stopImmediatePropagation()
        this.store.state.idOfOpenedProject = null
      }
    },

    updateHeight(heightOfOpenTable: number) {
      const toggleTableChildElement = (this.$refs.container as HTMLElement).querySelectorAll(".v-project__toggle-table")

      const totalToggleTableHeaderHeight = toggleTableChildElement.length * 20

      this.style.maxHeight =
          (this.$refs.containerTitle as HTMLElement).getBoundingClientRect().height
          + heightOfOpenTable
          + totalToggleTableHeaderHeight
          + "px"
    },

    toggleDescriptionView() {

      this.readMoreIsOpen = !this.readMoreIsOpen

      const descriptionContainer = this.$refs.descriptionContainer

      if( descriptionContainer instanceof HTMLElement ) {
        if( this.readMoreIsOpen ) {
          this.descriptionViewerStyle.maxHeight = descriptionContainer.getBoundingClientRect().height + 'px'

          this.style.maxHeight =
              parseFloat( this.style.maxHeight )
              + ( descriptionContainer.getBoundingClientRect().height
              - this.minHeightForLongContent ) + 'px'

          console.log( "this.style.maxHeight", this.style.maxHeight )
          console.log( "descriptionContainer.getBoundingClientRect().height", descriptionContainer.getBoundingClientRect().height )
          console.log( "this.minHeightForLongContent", this.minHeightForLongContent )
        }
        else
          this.descriptionViewerStyle.maxHeight = this.minHeightForLongContent + "px"

      } else {
        this.descriptionViewerStyle.maxHeight = ""
      }
    },

    getThisTableIsOpen(index: number): boolean {
      return this.arrayOfToggleTableOpen.includes(index)
    },

    tableToggled(index: number, $event: number) {
      this.updateHeight( $event )

      if( index === -1 || this.getThisTableIsOpen(index) ) this.arrayOfToggleTableOpen = [ -1 ]
      else this.arrayOfToggleTableOpen = [ index ]
    },
  },

  data() {
    return {
      store: useStore(key),
      style: {
        maxHeight: ""
      },
      descriptionViewerStyle: {
        maxHeight: ""
      },
      hasLongContent: false,
      minHeightForLongContent: 0,
      readMoreIsOpen: false,
      arrayOfToggleTableOpen: [] as number[],
    }
  },

  computed: {
    exhibitions(): IApiExhibition_links[] {
      return this.data.exhibition_links || []
    },

    images(): IApiImage[] {
      return this.data.images || []
    },

    showReadMoreButton(): boolean {
      return this.hasLongContent
    },

    thisIsOpen(): boolean {
      return this.stringProjectId === this.store.state.idOfOpenedProject
    },

    readMoreButtonText(): string {
      return this.readMoreIsOpen ? "show less" : "read more"
    }
  },

  watch: {
    thisIsOpen() {
      if( this.thisIsOpen && this.$refs["container"] instanceof HTMLElement) {
        this.arrayOfToggleTableOpen = [ -1 ]
        ;(this.$refs.firstTable as any).toggled()

      } else {
        this.arrayOfToggleTableOpen = []
        this.style.maxHeight = ""
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
  $height-of-closed-project: $font-title-size + $gutter;

  overflow: hidden;
  box-shadow:  $tile-box-shadow;
  transition: max-height 500ms ease-in-out;
  position: relative;
  max-height: $height-of-closed-project;

  &.is-closed {
    &:hover {
      max-height: $height-of-closed-project * 1.5;
    }
  }
}

.v-project__close {
  @extend .t-title;
  @include gutter;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: $gutter / 2;
  right: 0;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  transform: rotate3d(0, 0, 1, 0);
  opacity: 1;

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

.v-project__description__more {
  @extend .t-text-reg;
  display: block;
  background: none;
  border: none;
  padding: 0;
  text-decoration: underline;
  margin-top: 20px;
  margin-bottom: 20px;

  &:focus {
    color: $site-color;
    outline: none;
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
  transition: opacity 250ms ease-in-out 525ms;
  box-shadow: $tile-box-shadow;
  background: white;

  &:nth-child(1) { transition-delay: 150ms }
  &:nth-child(2) { transition-delay: 225ms }
  &:nth-child(3) { transition-delay: 300ms }
  &:nth-child(4) { transition-delay: 375ms }
  &:nth-child(5) { transition-delay: 450ms }

  .is-closed & {
    opacity: 0;
  }
}

</style>

<style lang="scss">
@import "../style/param";
@import "../style/grid";

.v-project__description-container {
  @include no-margin-for-first-and-last;
}

</style>
