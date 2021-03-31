import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, {key} from './store'
import {API_PROJECT_URL, IApiProject} from "@/api"
import MarkdownIt from "markdown-it"
import "./style/_main.scss"

getContent()
console.log("run app")

createApp(App)
  .use(store, key)
  .use(router)
  .mount('#app')

const markdownIt = new MarkdownIt()

async function getContent() {
  console.log('get content')
  getProjects()
}

async function getProjects() {
  const response = await fetch( API_PROJECT_URL )
  const projects: IApiProject[] = await response.json()

  for(const project of projects ) {
    if ( project.description )
      project.description = markdownIt.render( project.description )
  }

  store.commit( "updateProjects", projects )
}
