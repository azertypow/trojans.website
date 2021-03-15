<template>
  <section
      :class="{'is-open': !thisIsOpen}"
      class="v-project"
      :style="style"
  >
    <div
        ref="container"
        class="v-project__container">

      <h1 class="v-project__title t-title">{{ data.title }}</h1>
      <div v-html="data.description"></div>

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

  data() {
    return {
      store: useStore(key),
      style: {
        maxHeight: "O"
      }
    }
  },

  computed: {
    exhibitions(): IApiExhibition_links[] {
      return this.data.exhibition_links || []
    },

    thisIsOpen(): boolean {
      return this.stringProjectId === this.store.state.idOfOpenedProject
    },
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

.v-project {
  overflow: hidden;
  box-shadow:  $tile-box-shadow;
  transition: max-height 500ms ease-in-out;

  &.is-open {
    max-height: $font-title-size;
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
