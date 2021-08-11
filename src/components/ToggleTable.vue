<template>
  <div
      class="v-toggle-table"
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
        class="v-toggle-table__header"
        ref="headerContainer"
    >
      <div v-if="hasTitle"
           class="v-toggle-table__title"
      >{{title}}</div>
      <div
          class="v-toggle-table__toggle"
      >
        <template v-if="isOpen && hasCloseUi && !hasTitle">✗</template>
        <template v-else-if="!isOpen && !hasTitle">↗</template>
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

      console.log("document.getElementsByClassName(\"v-view-projects\")[0].scrollLeft", document.getElementsByClassName("v-view-projects")[0].scrollLeft)
      console.log("(this.$refs.headerContainer as HTMLElement).getBoundingClientRect().left", (this.$refs.headerContainer as HTMLElement).getBoundingClientRect().left)

      document.getElementsByClassName("v-view-projects")[0].scroll({
        top: 0,
        left: document.getElementsByClassName("v-view-projects")[0].scrollLeft + (this.$refs.headerContainer as HTMLElement).getBoundingClientRect().x,
      })
    },
  },

});
</script>

<style scoped lang="scss">
@import "../style/grid";
@import "../style/param";
@import "../style/typography";

$header-height: $gutter;

.v-toggle-table__header {
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

.v-toggle-table__toggle {
  font-family: 'Inter', Helvetica, Neue, sans-serif;
  @include gutter;
  position: absolute;
  top: 0;
  right: 0;
  color: $site-color;
}

.v-toggle-table__title {
  @extend .t-title;
  margin: 0;
  color: black;
}

.v-toggle-table__body {
  overflow: hidden;
  transition: max-height 500ms ease-in-out;
  background: $site-background-color;
  position: relative;
}

.v-toggle-table {
  background: white;
}

.is-dark .v-toggle-table__body__container {
  background-color: black;
  color: white;
}

.is-green {
  .v-toggle-table__header,
  .v-toggle-table__toggle,
  .v-toggle-table__body__container {
    background-color: $site-color;
    color: black;
  }
}

.has-body-container-padding-bottom .v-toggle-table__body__container {
  padding-bottom: $gutter;
}

.is-desk-width {
  .v-toggle-table {
    width: 20px;
    height: calc(100vh - #{$nav-height});
    box-sizing: border-box;

    &.is-open {
      width: auto;

      .v-toggle-table__body {
        display: block;
      }
    }
  }

  .v-toggle-table:nth-child(2) {
    box-shadow: none;

    &.is-open {
      width: 630px;
    }
  }

  .v-toggle-table__body {
    max-height: none !important;
    transition: none;
    display: none;
    height: calc( 100% - #{$header-height} );
  }

  .v-toggle-table__toggle {
    padding: 0;
  }

  .v-toggle-table__body__container {
    height: 100%;
    box-sizing: border-box;
  }
}

</style>
