import {createStore, Mutation, Store} from 'vuex'
import { InjectionKey } from 'vue'
import {IApiContact, IApiProject} from "@/api"

// define your typings for the store state

export interface State {
  projects: IApiProject[]
  contact: IApiContact | null
  menuIsOpen: boolean
  idOfOpenedProject: null | string
}

export interface IStoreMutation {
  [key: string]: Mutation<State>
  updateProjects(state: State, projects: IApiProject[]): void
  updateContact(state: State, contact: IApiContact): void
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    projects: [],
    contact: null,
    menuIsOpen: false,
    idOfOpenedProject: null
  },
  mutations: {
    updateProjects(state, projects) {
      state.projects = projects
    },
    updateContact(state, contact) {
      state.contact = contact
    },
  } as IStoreMutation,
  actions: {
  },
  modules: {
  }
})
