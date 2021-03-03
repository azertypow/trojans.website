<template>
  <navigation/>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from "vuex"
import {key} from "@/store"
import Navigation from "@/components/Navigation.vue"

export default defineComponent({
  name: 'App',

  components: {
    Navigation,
  },

});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
