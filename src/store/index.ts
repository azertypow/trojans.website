import {createStore, Mutation, Store} from 'vuex'
import { InjectionKey } from 'vue'
import {IApiProjects} from "@/api"

// define your typings for the store state

export interface State {
  projects: IApiProjects[]
}

export interface IStoreMutation {
  [key: string]: Mutation<State>
  updateProjects(state: State, projects: IApiProjects[]): void
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    projects: []
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
