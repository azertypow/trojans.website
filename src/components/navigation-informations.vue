<template>
  <div
      class="v-navigation-informations"
      @click="isClicked"
  >
    <div class="v-navigation-informations__txt">to navigate on this page, you can use the left, right, top and bottom arrows on your keyboard.</div>
    <div class="v-navigation-informations__ui" >✗</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({
  name: 'navigation-informations',

  data(){
    return {
      store: useStore(key)
    }
  },

  components: {
  },

  methods: {
    isClicked() {
      this.store.commit("updateTopArrowNavInformationActive", false)
    },
  },
});
</script>

<style lang="scss">
@import "../style/param";

.v-navigation-informations {
  color: $site-background-color;
  background-color: $site-color;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.v-navigation-informations__txt {
  text-align: center;
  line-height: $line-height;
  top: -1px;
  position: relative;
}

.v-navigation-informations__ui {
  font-family: 'Inter', Helvetica, Neue, sans-serif;
  position: absolute;
  top: 0;
  line-height: $line-height;
  right: $gutter / 2;
}

</style>
