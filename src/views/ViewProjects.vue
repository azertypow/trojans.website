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
          :index="{
            dateIndex: dateKey,
            projectIndex: key,
          }"
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
            class="v-view-projects__viewer__content__main"
        >
          <div
              class="v-view-projects__viewer__content__cover"
              v-if="currentProjectItem.cover !== null"
          >
            <gallery
                :data="{
                  image: currentProjectItem.cover
                }"
                desc-align="left"
            />
          </div>
          <div
              class="v-view-projects__viewer__content__intro"
              v-html="currentProjectItem.text"
          ></div>
        </div>

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
          :style="projects__viewer__contentImageStyle.forContainer"
      >
        <div
            class="v-view-projects__viewer__content--image"
            :style="projects__viewer__contentImageStyle.forChildren"
        >
          <gallery
              :data="{
                image: currentProjectItem.images
              }"
          ></gallery>
        </div>
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

<!--    <div-->
<!--        v-if="showArrowNavInformation"-->
<!--        class="v-view-projects__nav-icon-container"-->
<!--    >-->
<!--      <img class="t-icon_nav v-view-projects__nav-icon&#45;&#45;top"    v-if="store.state.showProjectNavArrowTop"     src="../style/images/nav_top.svg" alt="icon nav top">-->
<!--      <img class="t-icon_nav v-view-projects__nav-icon&#45;&#45;right"  v-if="store.state.showProjectNavArrowRight"   src="../style/images/nav_right.svg" alt="icon nav right">-->
<!--      <img class="t-icon_nav v-view-projects__nav-icon&#45;&#45;bottom" v-if="store.state.showProjectNavArrowBottom"  src="../style/images/nav_bottom.svg" alt="icon nav bottom">-->
<!--      <img class="t-icon_nav v-view-projects__nav-icon&#45;&#45;left"   v-if="store.state.showProjectNavArrowLeft"    src="../style/images/nav_left.svg" alt="icon nav left">-->
<!--      <p   class="v-view-projects__nav-icon&#45;&#45;text"-->
<!--      >use arrows on your keyboard<br>to navigate between projects.</p>-->
<!--    </div>-->

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Project from "../components/Project.vue"
import {useStore} from "vuex"
import {
  IIndexOfOpenProject,
  IProjectsSortedInArray,
  key,
  SortedProjectItem,
  updateShowProjectNavArrowParameters
} from "@/store"
import {IApiHomeImage, IApiProject} from "@/api"
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

  mounted() {
    window.addEventListener("keydown", this.keydownAction)
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.keydownAction)
  },

  methods: {

    keydownAction (key: KeyboardEvent) {
      if (key.code === "ArrowRight") {
        key.preventDefault()
        this.store.commit("updateShowProjectNavArrow", {
          key: "showProjectNavArrowRight",
          value: false,
        } as updateShowProjectNavArrowParameters)
        this.nextProjectItem()
      }
      else if (key.code === "ArrowLeft") {
        key.preventDefault()
        this.store.commit("updateShowProjectNavArrow", {
          key: "showProjectNavArrowLeft",
          value: false,
        } as updateShowProjectNavArrowParameters)

        this.beforeProjectItem()
      }
      else if (key.code === "ArrowUp") {
        key.preventDefault()
        this.store.commit("updateShowProjectNavArrow", {
          key: "showProjectNavArrowTop",
          value: false,
        } as updateShowProjectNavArrowParameters)

        this.nextProject()
      }
      else if (key.code === "ArrowDown") {
        key.preventDefault()
        this.store.commit("updateShowProjectNavArrow", {
          key: "showProjectNavArrowBottom",
          value: false,
        } as updateShowProjectNavArrowParameters)
        this.beforeProject()
      }
    },

    nextProjectItem() {
      if(this.store.state.indexOfOpenProject !== null) {

        const currentDateIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).dateIndex
        const currentProjectIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).projectIndex
        const currentItemIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).itemIndex

        const currentDate = (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[currentDateIndex]
        const currentProject = currentDate[currentProjectIndex]
        const currentItem = currentProject[currentItemIndex]

        const isLastDate    = currentDateIndex + 1    >= (this.store.getters.projectsSortedInArray as IProjectsSortedInArray).length
        const isLastProject = currentProjectIndex + 1 >= currentDate.length
        const isLastItem    = currentItemIndex + 1    >= currentProject.length

        const nextDateIndex: number = (() => {
          if      (isLastItem && isLastProject && !isLastDate)  return currentDateIndex + 1
                                                                return currentDateIndex
        })()

        const nextProjectIndex: number = (() => {
          if      (isLastItem && isLastProject && !isLastDate)  return 0
          else if (isLastItem && !isLastProject)                return currentProjectIndex + 1
                                                                return currentProjectIndex
        })()

        const nextItemIndex: number = (() => {
          if      (isLastItem && isLastProject && !isLastDate)  return 0
          else if (isLastItem && !isLastProject)                return 0
          else if (!isLastItem)                                 return currentItemIndex + 1
                                                                return currentItemIndex
        })()

        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: nextDateIndex,
          projectIndex: nextProjectIndex,
          itemIndex: nextItemIndex,
        } as IIndexOfOpenProject)

      } else {
        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: 0,
          projectIndex: 0,
          itemIndex: 0,
        } as IIndexOfOpenProject)
      }
    },

    nextProject() {
      if(this.store.state.indexOfOpenProject !== null) {

        const currentDateIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).dateIndex
        const currentProjectIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).projectIndex
        const currentItemIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).itemIndex

        const currentDate = (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[currentDateIndex]
        const currentProject = currentDate[currentProjectIndex]
        const currentItem = currentProject[currentItemIndex]

        const isLastDate    = currentDateIndex + 1    >= (this.store.getters.projectsSortedInArray as IProjectsSortedInArray).length
        const isLastProject = currentProjectIndex + 1 >= currentDate.length
        const isLastItem    = currentItemIndex + 1    >= currentProject.length

        const nextDateIndex: number = (() => {
          if      (isLastProject && !isLastDate)  return currentDateIndex + 1
          return currentDateIndex
        })()

        const nextProjectIndex: number = (() => {
          if      (isLastProject && !isLastDate)  return 0
          else if (!isLastProject)                return currentProjectIndex + 1
          return currentProjectIndex
        })()

        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: nextDateIndex,
          projectIndex: nextProjectIndex,
          itemIndex: 0,
        } as IIndexOfOpenProject)

      } else {
        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: 0,
          projectIndex: 0,
          itemIndex: 0,
        } as IIndexOfOpenProject)
      }
    },

    beforeProjectItem() {
      if(this.store.state.indexOfOpenProject !== null) {

        const currentDateIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).dateIndex
        const currentProjectIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).projectIndex
        const currentItemIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).itemIndex

        const currentDate = (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[currentDateIndex]
        const currentProject = currentDate[currentProjectIndex]
        const currentItem = currentProject[currentItemIndex]

        const isFirstDate    = currentDateIndex === 0
        const isFirstProject = currentProjectIndex === 0
        const isFirstItem    = currentItemIndex === 0

        const beforeDateIndex: number = (() => {
          if      (isFirstItem && isFirstProject && !isFirstDate)   return currentDateIndex - 1
                                                                    return currentDateIndex
        })()

        const beforeProjectIndex: number = (() => {
          if      (isFirstItem && isFirstProject && !isFirstDate)   return (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[beforeDateIndex].length - 1
          else if (isFirstItem && !isFirstProject)                  return currentProjectIndex - 1
                                                                    return currentProjectIndex
        })()

        const beforeItemIndex: number = (() => {
          if      (isFirstItem && isFirstProject && !isFirstDate)   return (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[beforeDateIndex][beforeProjectIndex].length - 1
          else if (isFirstItem && !isFirstProject)                  return (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[beforeDateIndex][beforeProjectIndex].length - 1
          else if (!isFirstItem)                                    return currentItemIndex - 1
                                                                    return currentItemIndex
        })()

        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: beforeDateIndex,
          projectIndex: beforeProjectIndex,
          itemIndex: beforeItemIndex,
        } as IIndexOfOpenProject)

      } else {
        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: 0,
          projectIndex: 0,
          itemIndex: 0,
        } as IIndexOfOpenProject)
      }
    },

    beforeProject() {
      if(this.store.state.indexOfOpenProject !== null) {

        const currentDateIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).dateIndex
        const currentProjectIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).projectIndex
        const currentItemIndex = (this.store.state.indexOfOpenProject as IIndexOfOpenProject).itemIndex

        const currentDate = (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[currentDateIndex]
        const currentProject = currentDate[currentProjectIndex]
        const currentItem = currentProject[currentItemIndex]

        const isFirstDate    = currentDateIndex === 0
        const isFirstProject = currentProjectIndex === 0
        const isFirstItem    = currentItemIndex === 0

        const beforeDateIndex: number = (() => {
          if      (isFirstProject && !isFirstDate)   return currentDateIndex - 1
          return currentDateIndex
        })()

        const beforeProjectIndex: number = (() => {
          if      (isFirstProject && !isFirstDate)   return (this.store.getters.projectsSortedInArray as IProjectsSortedInArray)[beforeDateIndex].length - 1
          else if (!isFirstProject)                  return currentProjectIndex - 1
          return currentProjectIndex
        })()

        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: beforeDateIndex,
          projectIndex: beforeProjectIndex,
          itemIndex: 0,
        } as IIndexOfOpenProject)

      } else {
        this.store.commit("updateIndexOfOpenProject", {
          dateIndex: 0,
          projectIndex: 0,
          itemIndex: 0,
        } as IIndexOfOpenProject)
      }
    },
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

    projects__viewer__contentImageStyle(): any {
      if( this.store.getters.sizeOfFirstProjectImage && this.$refs.projectViewer instanceof HTMLElement) {

        const imageRation =
            this.store.getters.sizeOfFirstProjectImage.height / this.store.getters.sizeOfFirstProjectImage.width * 100

        let imageWidth = this.store.getters.transformDataOfDesktopItemProjectViewer.width

        const imageHeight = imageWidth * imageRation / 100
        const projectViewerHeight = this.$refs.projectViewer.getBoundingClientRect().height

        if(imageHeight > projectViewerHeight) {
          imageWidth = projectViewerHeight / imageRation * 100
        }

        return {
          forContainer: {
            width: imageWidth + 'px',
          },
          forChildren: {
            paddingTop: imageRation + '%',
          },
        }
      }

      return {}
    },

    showArrowNavInformation(): boolean {

      const stillOneMoreArrowToShow =
              this.store.state.showProjectNavArrowTop
          ||  this.store.state.showProjectNavArrowRight
          ||  this.store.state.showProjectNavArrowBottom
          ||  this.store.state.showProjectNavArrowLeft

      return this.isDeskWidth
          // && !this.currentProjectItem
          && stillOneMoreArrowToShow
    }

  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/grid";

.v-view-projects {
  //overflow: hidden;
  position: relative;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    display: none;
  }
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
    //box-shadow: inset -10px 0px 10px -15px #00000033;
    padding: $gutter / 2;
  }

  .v-view-projects__scroll-space {
    width: 100%;
    height: calc( 100vh - 65px);
    flex-shrink: 1;
    background: linear-gradient(to right, $site-background-color, $site-color);
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
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.v-view-projects__nav-icon-container {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100000;
  pointer-events: none;
  //mix-blend-mode: multiply;
}

.t-icon_nav {
  position: absolute;
}

$nav-icon-space: 2px;

.v-view-projects__nav-icon--top {
  transform: translate3d(-50%, calc(-200% - #{$nav-icon-space / 2}), 0);
}

.v-view-projects__nav-icon--right {
  transform: translate3d( calc(50% + #{$nav-icon-space}), -100%, 0);
}

.v-view-projects__nav-icon--bottom {
  transform: translate3d(-50%, -100%, 0);
}

.v-view-projects__nav-icon--left {
  transform: translate3d( calc(-150% - #{$nav-icon-space / 2}), -100%, 0);
}

.v-view-projects__nav-icon--text {
  position: absolute;
  color: $site-color;
  width: 30em;
  text-align: center;
  transform: translate3d(-50%, 0, 0);
}

</style>

<style lang="scss">
@import "../style/param";

.is-desk-width .v-view-projects {
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

.is-desk-width {

  .v-view-projects__viewer__content--image {
    position: relative;
    width: 100%;

    > img {
      position: absolute;
      top: 0;
      right: 0;
      object-fit: cover;
    }
  }

}

.v-view-projects__viewer__content__main {
  display: flex;
  margin-bottom: $gutter;
  overflow: hidden;
}

.v-view-projects__viewer__content__cover {
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 0;
  padding-right: $gutter / 2;
  position: relative !important;

  .v-gallery {
    width: 40vw;
    height: 30vw;
    object-fit: cover;
    object-position: center;
  }

  .v-gallery__desc {
    position: relative !important;
    width: 100% !important;
    box-sizing: border-box;
    left: auto !important;
    right: 0 !important;
    padding-left: 0 !important;
    text-align: right !important;
  }
}

.v-view-projects__viewer__content__intro {
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 1;
  flex-grow: 1;

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
