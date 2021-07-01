<template>
  <section
      class="v-view-projects"
  >

    <div
        v-for="item in sortedProjects"
        class="v-view-projects__item"
    >
      <div
          class="v-view-projects__year"
      >
        <h5>{{item.projectYear}}</h5>
      </div>

      <Project
          v-for="(project, key) in item.projects"
          :data="project"
          :stringProjectId="`${item.projectYear}${key}`"
          @click="projectClicked(`${item.projectYear}${key}`)"
      />

    </div>

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Project from "../components/Project.vue"
import {useStore} from "vuex"
import {key} from "@/store"
import {IApiProject} from "@/api"
import ProjectGalleryMobile from "@/components/ProjectGalleryMobile.vue"

export default defineComponent({

  name: 'ViewProjects',

  components: {
    ProjectGalleryMobile,
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
    },
  },

  computed: {
    sortedProjects(): { projectYear: number, projects: IApiProject[] }[] {

      const projectSortedByYear: { projectYear: number, projects: IApiProject[] }[] = []

      for( const project of this.store.state.projects ) {
        if( project.date ) {
          const projectYear = new Date( project.date ).getFullYear()

          let projectAddedToArray = false

          for( const item of projectSortedByYear ) {
            if( item.projectYear === projectYear ) {
              item.projects.push( project )
              projectAddedToArray = true
              break
            }
          }

          if( !projectAddedToArray ) {
            projectSortedByYear.push({
              projects: [project],
              projectYear: projectYear
            })
          }
        }
      }

      return projectSortedByYear
    }
  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/grid";

.v-view-projects {
  overflow: hidden;
}

.v-view-projects__year {
  @include gutter;

  overflow: hidden;
  background: $site-background-color;
  box-shadow:  $tile-box-shadow;
  position: relative;
}

.is-desk-width {
  .v-view-projects {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
  }

  .v-view-projects__item {
    display: flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .v-view-projects__year {
    writing-mode: vertical-rl;
    text-align: right;
    padding: $gutter/2 0;
    width: auto;
    flex-shrink: 0;

    > * {
      margin: 0;
      transform: rotate3d(0, 0, 1, 180deg);
    }
  }
}

</style>
