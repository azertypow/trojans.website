<template>
  <section
      :class="{'is-closed': !thisIsOpen}"
      class="v-project"
      :style="style"
  >
    <div
        ref="container"
        class="v-project__container">

      <h1 class="v-project__title t-title">{{ data.title }}</h1>

      <div
          v-if="data.description"
          class="v-project__description-container"
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
          v-for="exhibition of exhibitions"
          :data="exhibition"
      />

    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType } from "vue"
import {IApiExhibition_links, IApiProject} from "@/api"
import Exhibition from "@/components/Exhibition.vue"
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({

  name: 'Project',
  components: {Exhibition},
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
    }
  },

  computed: {
    exhibitions(): IApiExhibition_links[] {
      return this.data.exhibition_links || []
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
      if( this.thisIsOpen && this.$refs["container"] instanceof HTMLElement)
        this.style.maxHeight = `${this.$refs["container"].getBoundingClientRect().height}px`
      else
        this.style.maxHeight = ""
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

  &.is-closed {
    max-height: $font-title-size;

    &:hover {
      max-height: $font-title-size * 1.5;
    }
  }
}

.v-project__description-viewer {
  overflow: hidden;
  transition: max-height 500ms ease-in-out;
}

.v-project__description-container {
  overflow: hidden;
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

.v-project__container {
  @include no-margin-for-first-and-last;
  overflow: hidden;
  background-color: $site-background-color;
}

.v-project__title {
  user-select: none;
  cursor: pointer;
}

</style>
