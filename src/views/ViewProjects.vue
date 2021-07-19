<template>
  <section
      class="v-view-projects"
  >

    <div
        v-for="(item, dateKey) in sortedProjects"
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
          :key="key + dateKey"
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

      interface IProjectYear { projectYear: number, projects: IApiProject[] }

      const projectSortedByYear: IProjectYear[] = []

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

      function compare( a: IProjectYear, b: IProjectYear ) {
        if ( a.projectYear < b.projectYear ){
          return -1;
        }
        if ( a.projectYear > b.projectYear ){
          return 1;
        }
        return 0;
      }

      projectSortedByYear.sort( compare );


      console.log( {projectSortedByYear} )

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

    .v-project.is-hidden {
      display: none;
    }
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

.is-desk-width {
  .v-view-projects__year {
    box-shadow: inset -10px 0px 10px -15px #00000033;
  }
}

</style>
