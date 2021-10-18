<template>
  <div
      class="v-toggle-table-fixed"
      :style="{
        transform: fixedComputedPosition
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
import {useStore} from "vuex"
import {key} from "@/store"

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

    fixedComputedPosition(): string {
      // mobile computed
      const bottomPadding = 65
      const topTranslate = 70
      const topValue = ( topTranslate * (4 - this.index) ) + bottomPadding

      // desk computed
      const leftTranslate = 70
      const leftValue = ( leftTranslate * (4 - this.index) )

      if( this.store.state.isDeskWidth ) {

        if(this.index > this.indexOfOpenTab) return `translate( calc( 100% - ${leftValue}px), 0 )`

        return `translate( ${this.index * leftTranslate}px, 0 )`

      } else {
        // if(this.index < this.indexOfOpenTab) return `translate(0, calc( -100% + ${topValue}px) )`
        if(this.index > this.indexOfOpenTab) return `translate(0, calc( 100% - ${topValue}px) )`

        return `translate(0, ${this.index * topTranslate}px)`
      }

    }
  },

  data() {
    return {
      store: useStore(key),
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
  overflow: hidden;
  box-sizing: border-box;
}

.v-toggle-table-fixed__header {
  box-shadow: $tile-box-shadow;
  background: $site-background-color;
  position: relative;
  height: $header-height;
  user-select: none;
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
  transition: max-height 500ms ease-in-out;
  background: $site-background-color;
  position: relative;
  height: calc( 100vh - (4 * 70px + 65px) );
  overflow: auto;
}

.v-toggle-table-fixed {
  background: white;
  box-shadow: $tile-box-shadow;
}

.v-toggle-table-fixed__body__container {
  height: 100%;
  scroll-behavior: smooth;
  overflow: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    display: none;
  }
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

.is-desk-width {

  @mixin title-over($color-title) {
    &:not(.is-open) {
      &:hover {
        .v-toggle-table-fixed__header {
          cursor: pointer;

          .v-toggle-table-fixed__title {
            color: $color-title;
          }
        }
      }
    }
  }

  .v-toggle-table-fixed {
    height: calc( 100% - 65px );
    display: flex;

    &.is-open {
      width: calc( 100% - (70px * 3) );
    }

    @include title-over($site-color);

    &.is-green {
      @include title-over($site-background-color);
    }
  }

  .v-toggle-table-fixed__header {
    box-sizing: border-box;
    height: 100%;
    width: auto;
  }

  .v-toggle-table-fixed__body {
    height: 100%;
    width: 100%;
  }

  .v-toggle-table-fixed__title {
    writing-mode: vertical-rl;
    text-align: right;
    width: 50px;
    height: 100%;
    transform: rotate3d(0, 0, 1, 180deg);
  }

  .has-title {
    .v-toggle-table-fixed__header {
      padding: $gutter/2;
    }
  }

}

</style>
