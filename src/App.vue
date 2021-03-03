<template>
  <div v-for="project in projects">
    <Project
        :data="project"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Project from "@/components/Project.vue"
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({
  name: 'App',

  components: {
    Project,
  },

  data() {
    return {
      store: useStore(key)
    }
  },

  computed: {
    projects(): any {
      return this.store.state.projects
    }
  }

});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
