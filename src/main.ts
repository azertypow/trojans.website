import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, {key} from './store'
import {
  API_ABOUT_URL,
  API_AWARDS_URL,
  API_CONTACT_URL, API_INFO_URL, API_MANIFESTO_URL,
  API_PROJECT_URL, API_WITH_US_URL,
  IApiAbout,
  IApiContact,
  IApiExhibitionsAndAwards, IApiInfo, IApiManifesto,
  IApiProject, IApiTheyWorkWithUs
} from "@/api"
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
  getAbout()
  getAward()
  getManifesto()
  getInfo()
  getTheyWorkWithUs()
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

async function getAbout() {
  const response = await fetch( API_ABOUT_URL )
  const about: IApiAbout = await response.json()

  store.commit( "updateAbout", about )
}

async function getAward() {
  const response = await fetch( API_AWARDS_URL )
  const award: IApiExhibitionsAndAwards  = await response.json()

  store.commit( "updateAward", award )
}

async function getManifesto() {
  const response = await fetch( API_MANIFESTO_URL )
  const manifesto: IApiManifesto = await response.json()

  store.commit( "updateManifesto", manifesto )
}

async function getInfo() {
  const response = await fetch( API_INFO_URL )
  const info: IApiInfo = await response.json()

  info.infos = markdownIt.render( info.infos )

  store.commit( "updateInfo", info )
}

async function getTheyWorkWithUs() {
  const response = await fetch( API_WITH_US_URL )
  const theyWorkWithUs: IApiTheyWorkWithUs = await response.json()

  store.commit( "updateTheyWorkWithUs", theyWorkWithUs )
}
