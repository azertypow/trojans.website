import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store, {key} from './store'

createApp(App)
  .use(store, key)
  .mount('#app')

getContent()

async function getContent() {
  getProjects()
}

async function getProjects() {
  const response = await fetch("http://104.248.20.170/Projects")
  const projects = await response.json()
  store.commit( "updateProjects", projects )
}

export interface IProject {
  id: number,
  description: string,
  title: string,
  published_at: Date,
  created_at: Date,
  updated_at: Date,
  exhibition_links: [],
  images: []
}
