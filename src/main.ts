import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, {key} from './store'
import {API_CONTACT_URL, API_PROJECT_URL, IApiContact, IApiProject} from "@/api"
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
  getContact()
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

async function getContact() {
  const response = await fetch( API_CONTACT_URL )
  const contact: IApiContact = await response.json()

  store.commit( "updateContact", contact )
}
