<template>
  <div
      class="v-toggle-table-fixed"
      :style="{
        transform: transformTop
      }"
      :class="{
        'is-open': isOpen,
        'is-dark': isDark,
        'is-green': isGreen,
        'has-title': hasTitle,
        'has-body-container-padding-bottom': hasBodyContainerPaddingBottom,
      }"
  >

    <div
        @click="toggled"
        class="v-toggle-table-fixed__header"
        ref="headerContainer"
    >
      <div v-if="hasTitle"
           class="v-toggle-table-fixed__title"
      >{{title}}</div>
      <div
          class="v-toggle-table-fixed__toggle"
      >
        <template v-if="isOpen && hasCloseUi && !hasTitle">✗</template>
        <template v-else-if="!isOpen && !hasTitle">↗</template>
      </div>
    </div>

    <div
        class="v-toggle-table-fixed__body"
    >
      <div
          class="v-toggle-table-fixed__body__container"
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

  name: 'ToggleTableFixed',

  mounted() {
    (this as any).$nextTick(() => {
      this.$emit("mounted")
    })
  },

  props:{
    index: {
      type: Number,
      required: true,
    },

    indexOfOpenTab: {
      type: Number,
      required: true,
    },

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
    isGreen: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    title: {
      type: String,
      required: false,
      default: () => "",
    },
    hasBodyContainerPaddingBottom: {
      type: Boolean,
      required: false,
      default: () => true,
    }
  },

  computed: {
    hasTitle(): boolean {
      return  this.title.length > 0
    },

    transformTop(): string {
      const bottomPadding = 65
      const topTranslate = 70
      const topValue = ( topTranslate * (4 - this.index) ) + bottomPadding

      // if(this.index < this.indexOfOpenTab) return `translate(0, calc( -100% + ${topValue}px) )`
      if(this.index > this.indexOfOpenTab) return `translate(0, calc( 100% - ${topValue}px) )`

      return `translate(0, ${this.index * topTranslate}px)`
    }
  },

  data() {
    return {

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
@import "../style/typography";

$header-height: $gutter;

.v-toggle-table-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
}

.v-toggle-table-fixed__header {
  box-shadow: $tile-box-shadow;
  background: $site-background-color;
  position: relative;
  height: $header-height;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  .has-title & {
    height: auto;
    padding: $gutter/2 3em $gutter/2 $gutter/2;
  }
}

.v-toggle-table-fixed__toggle {
  font-family: 'Inter', Helvetica, Neue, sans-serif;
  @include gutter;
  position: absolute;
  top: 0;
  right: 0;
  color: $site-color;
}

.v-toggle-table-fixed__title {
  @extend .t-title;
  margin: 0;
  color: black;
}

.v-toggle-table-fixed__body {
  //overflow: hidden;
  transition: max-height 500ms ease-in-out;
  background: $site-background-color;
  position: relative;
  height: calc( 100vh - (4 * 70px + 65px) );
  overflow: scroll;
}

.v-toggle-table-fixed {
  background: white;
  box-shadow: $tile-box-shadow;
}

.is-dark .v-toggle-table-fixed__body__container {
  background-color: black;
  color: white;
}

.is-green {
  .v-toggle-table-fixed__header,
  .v-toggle-table-fixed__toggle,
  .v-toggle-table-fixed__body__container {
    background-color: $site-color;
    color: black;
  }
}

.has-body-container-padding-bottom .v-toggle-table-fixed__body__container {
  padding-bottom: $gutter;
}

</style>
