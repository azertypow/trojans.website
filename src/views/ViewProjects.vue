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
          v-if="isMobileWidth"
          v-for="(project, key) in item.projects"
          :data="project"
          :stringProjectId="`${item.projectYear}${key}`"
          :key="key + dateKey"
      />

      <project-viewer-desktop
          v-else-if="isDeskWidth"
          v-for="(project, key) in item.projects"
          :data="project"
          :stringProjectId="`${item.projectYear}${key}`"
          :key="key + dateKey"
          :index="{
            dateIndex: dateKey,
            projectIndex: key,
          }"
      />

    </div>

    <div
        v-if="isDeskWidth"
        class="v-view-projects__scroll-space"
    ></div>

    <div
        v-if="isDeskWidth && currentProjectItem !== null"
        class="v-view-projects__viewer"
        ref="projectViewer"
        :style="projectContentViewerStyle"
    >
      <div
          v-if="currentProjectItem.type === 'intro'"
          class="v-view-projects__viewer__content"
          :style="styleIntroContent"
      >
        <div
            class="v-view-projects__viewer__content__intro"
            v-html="currentProjectItem.text"
        ></div>

        <div
            class="v-view-projects__viewer__content__links"
        >
          <a
              v-for="link of currentProjectItem.exhibition_links"
              :href="link.exhibition_link"
              class="no-style"
          >
            <div
                class="v-view-projects__viewer__content__links__type t-text-subtitle link-style"
            >{{link.type}}</div>
            <div class="v-view-projects__viewer__content__links__date t-text-small" >{{link.date}}</div>
            <div class="v-view-projects__viewer__content__links__content t-text-small" >{{link.exhibition_title}}</div>
            <div class="v-view-projects__viewer__content__links__content t-text-small" >{{link.partenariat_description}}</div>
          </a>
        </div>

      </div>


      <div
          v-else-if="currentProjectItem.type === 'image'"
          class="v-view-projects__viewer__content"
      >
        <gallery
            :data="{
              image: currentProjectItem.images
            }"
        ></gallery>
      </div>

      <div
          v-else-if="currentProjectItem.type === 'vimeo'"
          class="v-view-projects__viewer__content"
      >
        <gallery
            :data="{
              image: currentProjectItem.images,
              vimeo: currentProjectItem.Vimeo,
            }"
        ></gallery>
      </div>

    </div>

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Project from "../components/Project.vue"
import {useStore} from "vuex"
import {IProjectsSortedInArray, key, SortedProjectItem} from "@/store"
import {IApiProject} from "@/api"
import ProjectGalleryMobile from "@/components/ProjectGalleryMobile.vue"
import ProjectViewerDesktop from "@/components/ProjectViewerDesktop.vue"
import Gallery from "@/components/Gallery.vue"

export default defineComponent({

  name: 'ViewProjects',

  components: {
    Gallery,
    ProjectViewerDesktop,
    ProjectGalleryMobile,
    Project,
  },

  data() {
    return {
      store: useStore(key)
    }
  },

  methods: {
  },

  computed: {

    isMobileWidth(): boolean {
      return this.store.state.isMobileWidth
    },

    isDeskWidth(): boolean {
      return this.store.state.isDeskWidth
    },

    projectContentViewerStyle(): any {
      return {
        left: this.store.getters.transformDataOfDesktopItemProjectViewer.left + 'px',
        width: this.store.getters.transformDataOfDesktopItemProjectViewer.width + 'px',
      }
    },

    styleIntroContent(): any {
      return {
        width: this.store.getters.transformDataOfDesktopItemProjectViewer.width + 'px',
      }
    },

    sortedProjects(): { projectYear: number, projects: IApiProject[] }[] {
      return this.store.state.sortedProject
    },

    currentProjectItem(): SortedProjectItem | null {

      if(this.store.state.indexOfOpenProject === null) return null

      const dateIndex     = this.store.state.indexOfOpenProject.dateIndex
      const projectIndex  = this.store.state.indexOfOpenProject.projectIndex
      const itemIndex     = this.store.state.indexOfOpenProject.itemIndex

      return (this.store.getters.projectsSortedInArray as IProjectsSortedInArray) [dateIndex][projectIndex][itemIndex]
    },

  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/grid";

.v-view-projects {
  overflow: hidden;
  position: relative;
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

    .v-project-viewer-desktop.is-hidden {
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
    padding: $gutter / 2;
  }

  .v-view-projects__scroll-space {
    width: calc(100vw - 60px);
    height: 50vh;
    flex-shrink: 0;
  }

  .v-view-projects__viewer {
    transition: left 250ms linear, width 250ms;
    position: absolute;
    top: $gutter / 2;
    left: 500px;
    height: calc( 100% - #{$gutter / 2} );
    //background: black;
    z-index: 900;
  }
  .v-view-projects__viewer__content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: white;
  }
}

</style>

<style lang="scss">
@import "../style/param";

.v-view-projects {
  .v-gallery__desc {
    position: absolute !important;
    bottom: 0;
    box-sizing: border-box;
    background: white;
    width: 100%;
    text-align: right;
    margin: 0;
    padding: ($gutter / 4) ($gutter / 2);
  }
}


.v-view-projects__viewer__content__intro {
  margin-bottom: $gutter;

  > *:first-child {
    margin-top: 0 !important;
  }

  > *:last-child {
    margin-bottom: 0 !important;
  }
}

.v-view-projects__viewer__content__links {
  display: flex;

  > * {
    display: block;
    width: calc(100% / 3);
    box-sizing: border-box;
    padding-right: $gutter;
  }

  a:hover .v-view-projects__viewer__content__links__type:after {
    transform: translate3d(2px, -2px, 0);
  }

}

.v-view-projects__viewer__content__links__type {
  color: $site-color !important;
  margin-top: 0;
  margin-bottom: 0;
}

.v-view-projects__viewer__content__links__date {
  margin-top: 0;
  margin-bottom: 10px;
}

.v-view-projects__viewer__content__links__content {
  margin: 0;
}

</style>
