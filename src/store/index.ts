import {createStore, Mutation, Store} from 'vuex'
import { InjectionKey } from 'vue'
import {
  IApiAbout,
  IApiContact, IApiExhibition_links,
  IApiExhibitionsAndAwards, IApiHomeImage, IApiImage,
  IApiInfo,
  IApiManifesto,
  IApiProject, IApiTags,
  IApiTheyWorkWithUs, IAPiVimeo, ISecondTags
} from "@/api"
import {ISortedProjectsByYear, sortProjectsByYear} from "@/global/sortProjectsByYear"

// define your typings for the store state

export interface IIndexOfOpenProject {
  dateIndex: number
  projectIndex: number
  itemIndex: number
}

export interface updateShowProjectNavArrowParameters {
  key: "showProjectNavArrowTop"
    |"showProjectNavArrowRight"
    |"showProjectNavArrowBottom"
    |"showProjectNavArrowLeft",
  value: boolean
}

export interface State {
  projects: IApiProject[]
  sortedProject: ISortedProjectsByYear

  tags: IApiTags[]
  activatedTags: string[]

  secondaryTag: ISecondTags[]
  activatedSecondaryTag: string | null

  widthOfProjectOpen: number
  titleWidthOfProjectOpen: number
  leftPositionOfProjectItem: number | null

  contact: IApiContact | null
  menuIsOpen: boolean

  idOfOpenedProject: null | string
  indexOfOpenProject: null | IIndexOfOpenProject

  indexOfOpenAboutTab: number

  about:          IApiAbout | null
  award:          IApiExhibitionsAndAwards | null
  manifesto:      IApiManifesto | null
  info:           IApiInfo | null
  theyWorkWithUs: IApiTheyWorkWithUs | null
  homeImages:     IApiHomeImage[] | null
  isMobileWidth:  boolean
  isDeskWidth:    boolean

  showProjectNavArrowTop: boolean
  showProjectNavArrowRight: boolean
  showProjectNavArrowBottom: boolean
  showProjectNavArrowLeft: boolean

  mousePosition: {x: number, y: number} | null

  topArrowNavInformationActive: boolean
}

export interface IStoreMutation {
  [key: string]: Mutation<State>
  updateProjects        (state: State, projects:       IApiProject[]): void

  updateShowProjectNavArrow(
    state: State,
    value: updateShowProjectNavArrowParameters  ): void

  updateIdOfOpenedProject(state: State, id: string | null): void
  updateIndexOfOpenProject(state: State, indexOfOpenProject: IIndexOfOpenProject): void

  updateIndexOfOpenAboutTab(state: State, indexOfOpenAboutTab: number): void

  updateTags            (state: State, tags:           IApiTags[]): void
  tagsListAddTag        (state: State, tagToAdd:       string): void
  tagsListRemoveTag     (state: State, tagToRemove:    string): void

  updateSecondaryTags               (state: State, tags: ISecondTags[]): void
  ToggleSecondaryTagActivated       (state: State, tagToToggle:       string): void

  updateWidthOfProjectOpen (state: State, width: number): void
  updateTitleWidthOfProjectOpen (state: State, width: number): void
  updateLeftPositionOfProjectItem (state: State, left: number): void

  updateContact         (state: State, contact:        IApiContact): void
  updateAbout           (state: State, about:          IApiAbout): void
  updateAward           (state: State, award:          IApiExhibitionsAndAwards): void
  updateManifesto       (state: State, manifesto:      IApiManifesto): void
  updateInfo            (state: State, info:           IApiInfo): void
  updateTheyWorkWithUs  (state: State, theyWorkWithUs: IApiTheyWorkWithUs): void
  updateHomeImages      (state: State, homeImages: IApiHomeImage[]): void
  updateScreenWidth     (state: State, screenWidth: number): void

  updateMousePosition(sate: State, mousePosition: {x: number, y: number}): void

  updateTopArrowNavInformationActive(state: State, value: boolean): void
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    projects: [],
    sortedProject: [],

    tags: [],
    activatedTags: [],

    secondaryTag: [],
    activatedSecondaryTag: null,

    widthOfProjectOpen: 0,
    titleWidthOfProjectOpen: 0,
    leftPositionOfProjectItem: null,

    contact: null,
    menuIsOpen: false,

    idOfOpenedProject: null,
    indexOfOpenProject: null,

    indexOfOpenAboutTab: 0,

    about: null,
    award: null,
    info: null,
    manifesto: null,
    theyWorkWithUs: null,
    homeImages: null,
    isDeskWidth: false,
    isMobileWidth: false,

    showProjectNavArrowTop: true,
    showProjectNavArrowRight: true,
    showProjectNavArrowBottom: true,
    showProjectNavArrowLeft: true,

    mousePosition: null,

    topArrowNavInformationActive: true,
  },
  mutations: {
    updateProjects(state, projects) {
      state.sortedProject = sortProjectsByYear({
        projects: projects
      }).reverse()
      state.projects = projects
    },

    updateShowProjectNavArrow(state, value) {
      state[value.key] = value.value
    },

    updateIdOfOpenedProject(state, id) {
      state.idOfOpenedProject = id
    },
    updateIndexOfOpenProject(state: State, indexOfOpenProject: IIndexOfOpenProject | null) {

      state.idOfOpenedProject = indexOfOpenProject === null ? null : `${state.sortedProject[indexOfOpenProject.dateIndex].projectYear}${indexOfOpenProject.projectIndex}`

      state.indexOfOpenProject = indexOfOpenProject
    },

    updateIndexOfOpenAboutTab(state: State, indexOfOpenAboutTab: number) {
      state.indexOfOpenAboutTab = indexOfOpenAboutTab
    },

    updateTags(state: State, tags: IApiTags[]) {
      state.tags = tags
    },
    tagsListAddTag(state: State, tagToAdd: string) {
      state.activatedTags.push( tagToAdd )
    },
    tagsListRemoveTag(state: State, tagToRemove: string) {
      const indexOfTagToRemove = state.activatedTags.indexOf( tagToRemove )
      if( indexOfTagToRemove > -1 ) state.activatedTags.splice( indexOfTagToRemove, 1 )
      else console.error(`can't remove ${tagToRemove}, because isn't in activatedTags array stored`)
    },

    updateSecondaryTags(state: State, secondaryTags: ISecondTags[]) {
      state.secondaryTag = secondaryTags
    },

    ToggleSecondaryTagActivated(state: State, tagToToggle: string) {
      if ( state.activatedSecondaryTag === tagToToggle) state.activatedSecondaryTag = null
      else state.activatedSecondaryTag = tagToToggle
    },

    updateWidthOfProjectOpen(state: State, width: number) {
      state.widthOfProjectOpen = width
    },
    updateTitleWidthOfProjectOpen(state, width) {
      state.titleWidthOfProjectOpen = width
    },
    updateLeftPositionOfProjectItem(state: State, position: number) {
      state.leftPositionOfProjectItem = position
    },

    updateContact(state, contact) {
      state.contact = contact
    },
    updateAbout(state: State,  about: IApiAbout) {
      state.about = about
    },
    updateAward(state: State, award: IApiExhibitionsAndAwards) {
      state.award = award
    },
    updateInfo(state: State, info: IApiInfo) {
      state.info = info
    },
    updateManifesto(state: State, manifesto: IApiManifesto) {
      state.manifesto = manifesto
    },
    updateTheyWorkWithUs(state: State, theyWorkWithUs: IApiTheyWorkWithUs) {
      state.theyWorkWithUs = theyWorkWithUs
    },
    updateHomeImages(state: State, homeImages: IApiHomeImage[]) {
      state.homeImages = homeImages
    },
    updateScreenWidth(state: State, screenWidth: number) {

      const mobileBreakPoint = 900
      const isMobileWidth = screenWidth < mobileBreakPoint

      state.isMobileWidth = isMobileWidth
      state.isDeskWidth   = !isMobileWidth
    },

    updateMousePosition(state, mousePosition) {
      state.mousePosition = mousePosition
    },

    updateTopArrowNavInformationActive(state, value) {
      state.topArrowNavInformationActive = value
    }

  } as IStoreMutation,
  actions: {
  },
  modules: {
  },
  getters: {
    transformDataOfDesktopItemProjectViewer(state, getters): {width: number, left: number} {

      if(state.indexOfOpenProject === null) return {
        left: window.innerWidth / 2,
        width: 0,
      }

      const widthOfTabItemProject = 20
      const currentProjectOpen = (getters.projectsSortedInArray as IProjectsSortedInArray)[state.indexOfOpenProject.dateIndex][state.indexOfOpenProject.projectIndex]
      const widthOfTotalTabsItemProject = widthOfTabItemProject * currentProjectOpen.length

      return {
        left: (state.leftPositionOfProjectItem || 0) + state.titleWidthOfProjectOpen + widthOfTabItemProject * state.indexOfOpenProject.itemIndex,
        width: state.widthOfProjectOpen - state.titleWidthOfProjectOpen - widthOfTotalTabsItemProject,
      }
    },

    projectsSortedInArray(state): IProjectsSortedInArray {

      return state.sortedProject.map((yearContent, yearContentIndex) => {
        return yearContent.projects.map( ( project, projectIndex ) => {

          const images: ISortedProjectItemImage[] = project.images?.map( image => {
            return {
              type: 'image',
              images: image,
            }
          }) || []

          const vimeo: ISortedProjectItemVimeo[] = project.Vimeo?.map(vimeo => {
            return {
              type: "vimeo",
              Vimeo: vimeo
            }
          }) || []

          const intro = [{
            text: project.description,
            type: "intro",
            exhibition_links: project.exhibition_links,
            cover: project.cover
          } as ISortedProjectItemDescription]

          return (intro as SortedProjectItem[]).concat(images, vimeo)
        })
      })

    },



    sizeOfFirstProjectImage(state, getters): {width: number | undefined, height: number | undefined} | null {

      if(state.indexOfOpenProject) {
        const currentProject = (getters.projectsSortedInArray as IProjectsSortedInArray)
          [state.indexOfOpenProject.dateIndex]
          [state.indexOfOpenProject.projectIndex]

        const firstImageOrVideoItem: SortedProjectItem | undefined = currentProject[1]

        if(firstImageOrVideoItem?.type === 'image' ) {

          return {
            width: firstImageOrVideoItem.images.width,
            height: firstImageOrVideoItem.images.height,
          }

        }
      }

      return null

    }
  }
})


export type IProjectsSortedInArray = SortedProjectItem[][][]

export type SortedProjectItem =
  | ISortedProjectItemDescription
  | ISortedProjectItemImage
  | ISortedProjectItemVimeo

export type ProjectItemType = 'intro' | 'image' | 'vimeo'

export interface ISortedProjectItem {
  type: ProjectItemType
}

export interface ISortedProjectItemDescription extends ISortedProjectItem {
  type: 'intro'
  text: string
  exhibition_links: IApiExhibition_links []
  cover: IApiImage | null
}

export interface ISortedProjectItemImage extends ISortedProjectItem {
  type: 'image'
  images: IApiImage
}
export interface ISortedProjectItemVimeo extends ISortedProjectItem {
  type: 'vimeo'
  Vimeo: IAPiVimeo
}
