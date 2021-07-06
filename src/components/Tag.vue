<template>
  <div
      @click="toggleStatus"
      :class="{
        'is-active': isActive
      }"
      class="v-tag"
  >
    <div class="v-tag__ui"></div>
    <div class="v-tag__name">{{tag}}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({

  name: 'Tag',

  props: {
    tag: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      store: useStore(key)
    }
  },

  methods: {
    toggleStatus() {
      if( this.isActive ) this.store.commit('tagsListRemoveTag', this.tag)
      else this.store.commit('tagsListAddTag', this.tag)
    }
  },

  computed: {
    isActive(): boolean {
      return this.store.state.activatedTags.includes( this.tag )
    }
  }

});
</script>

<style  lang="scss">
@import "../style/param";
@import "../style/grid";
@import "../style/typography";

.v-tag {
  @include gutter;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  .v-tag__ui {
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border: solid 1px darkgrey;
    border-radius: 100%;
  }

  .v-tag__name {
    @include gutter;
    @extend .t-text-subtitle;
    white-space: nowrap;
    color: black;
  }

  &.is-active {
    .v-tag__ui {
      background: $site-color;
      border-color: $site-color;
    }
  }
}
</style>
