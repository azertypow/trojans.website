<template>
  <section
      class="v-view-projects"
  >

    <div
        v-for="(projectsInThisYear, year) in sortedProjects"
    >
      <h3>{{year}}</h3>

      <Project
          v-for="(project, key) in projectsInThisYear"
          :data="project"
          :stringProjectId="`${year}${key}`"
          @click="projectClicked(`${year}${key}`)"
      />

    </div>

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Project from "../components/Project.vue"
import {useStore} from "vuex"
import {key} from "@/store"
import ToggleTable from "@/components/ToggleTable.vue"
import {IApiProject} from "@/api"

export default defineComponent({

  name: 'ViewProjects',

  components: {
    ToggleTable,
    Project,
  },

  data() {
    return {
      store: useStore(key)
    }
  },

  methods: {
    projectClicked(stringID: string){

      this.store.state.idOfOpenedProject = stringID

      console.log( "project clicked",  stringID)
    },
  },

  computed: {
    sortedProjects(): { [key: number]: IApiProject[] } {

      const projectSortedByYear: { [key: number]: IApiProject[] } = {}

      for( const project of this.store.state.projects ) {
        if( project.date ) {
          const projectYear = new Date( project.date ).getFullYear()
          projectSortedByYear.hasOwnProperty( projectYear ) ?
              projectSortedByYear[projectYear].push( project ) :
              projectSortedByYear[projectYear] = [ project ]
        }
      }

      return projectSortedByYear
    }
  }

});
</script>

<style scoped lang="scss">

</style>
