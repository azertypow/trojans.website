<template>
  <div
      class="v-toggle-table"
      :class="{
        'is-open': isOpen,
        'is-dark': isDark,
      }"
  >

    <div
        @click="toggled"
        class="v-toggle-table__header"
        ref="headerContainer"
    >
      <div v-if="title.length > 0">{{title}}</div>
      <div
          class="v-toggle-table__toggle"
      >
        <template v-if="isOpen && hasCloseUi">✗</template>
        <template v-else-if="!isOpen">↗</template>
      </div>
    </div>

    <div
        class="v-toggle-table__body"
        :style="{
          maxHeight: calculatedHeight
        }"
    >
      <div
          class="v-toggle-table__body__container"
          ref="container"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"

export default defineComponent({

  emits: [
      "toggled",
      "mounted",
  ],

  name: 'ToggleTable',

  mounted() {
    (this as any).$nextTick(() => {
      this.$emit("mounted")
    })
  },

  props:{
    hasCloseUi: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    isDark: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    title: {
      type: String,
      required: false,
      default: () => "",
    }
  },

  data() {
    return {
      calculatedHeight: "0"
    }
  },

  watch: {
    isOpen() {
      if( this.isOpen ) {
        const container = this.$refs.container
        if (container instanceof HTMLElement) {
          this.calculatedHeight = `${container.getBoundingClientRect().height}px`
        }
      } else {
        this.calculatedHeight = "0"
      }
    }
  },

  methods: {
    toggled() {

      const headerContainerHeight: number = (this.$refs.headerContainer as HTMLElement).getBoundingClientRect().height
      const containerHeight: number = (this.$refs.container as HTMLElement).getBoundingClientRect().height

      this.$emit("toggled", headerContainerHeight + containerHeight)
    },
  },

});
</script>

<style scoped lang="scss">
@import "../style/grid";
@import "../style/param";

$header-height: $gutter;

.v-toggle-table__header {
  box-shadow: $tile-box-shadow;
  background: $site-background-color;
  position: relative;
  height: $header-height;
  user-select: none;
  cursor: pointer;
}

.v-toggle-table__toggle {
  @include gutter;
  position: absolute;
  top: 0;
  right: 0;
}

.v-toggle-table__body {
  overflow: hidden;
  transition: max-height 500ms ease-in-out;
}

.is-dark .v-toggle-table__body__container {
  background-color: black;
  color: white;
}

</style>
