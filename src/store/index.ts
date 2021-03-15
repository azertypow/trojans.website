import {createStore, Mutation, Store} from 'vuex'
import { InjectionKey } from 'vue'
import {IApiProject} from "@/api"

// define your typings for the store state

export interface State {
  projects: IApiProject[]
  menuIsOpen: boolean
  idOfOpenedProject: null | string
}

export interface IStoreMutation {
  [key: string]: Mutation<State>
  updateProjects(state: State, projects: IApiProject[]): void
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    projects: [],
    menuIsOpen: false,
    idOfOpenedProject: null
  },
  mutations: {
    updateProjects(state, projects) {
      state.projects = projects
    },
  } as IStoreMutation,
  actions: {
  },
  modules: {
  }
})
