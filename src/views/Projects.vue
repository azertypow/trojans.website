<template>
  <section
      class="v-projects"
      v-for="project in projects"
  >
    <Project
        :data="project"
    />
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Project from "../components/Project.vue"
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({

  name: 'Projects',

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

<style scoped lang="scss">

</style>
