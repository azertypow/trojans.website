import {createStore, Mutation, Store} from 'vuex'
import { InjectionKey } from 'vue'
import {
  IApiAbout,
  IApiContact,
  IApiExhibitionsAndAwards,
  IApiInfo,
  IApiManifesto,
  IApiProject,
  IApiTheyWorkWithUs
} from "@/api"

// define your typings for the store state

export interface State {
  projects: IApiProject[]
  contact: IApiContact | null
  menuIsOpen: boolean
  idOfOpenedProject: null | string
  about:          IApiAbout | null
  award:          IApiExhibitionsAndAwards | null
  manifesto:      IApiManifesto | null
  info:           IApiInfo | null
  theyWorkWithUs: IApiTheyWorkWithUs | null
}

export interface IStoreMutation {
  [key: string]: Mutation<State>
  updateProjects        (state: State, projects:       IApiProject[]): void
  updateContact         (state: State, contact:        IApiContact): void
  updateAbout           (state: State, about:          IApiAbout): void
  updateAward           (state: State, award:          IApiExhibitionsAndAwards): void
  updateManifesto       (state: State, manifesto:      IApiManifesto): void
  updateInfo            (state: State, info:           IApiInfo): void
  updateTheyWorkWithUs  (state: State, theyWorkWithUs: IApiTheyWorkWithUs): void
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    projects: [],
    contact: null,
    menuIsOpen: false,
    idOfOpenedProject: null,
    about: null,
    award: null,
    info: null,
    manifesto: null,
    theyWorkWithUs: null
  },
  mutations: {
    updateProjects(state, projects) {
      state.projects = projects
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
    }
  } as IStoreMutation,
  actions: {
  },
  modules: {
  }
})
