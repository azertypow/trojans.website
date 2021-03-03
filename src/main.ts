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
  const response = await fetch("http://104.248.20.170/Projects?_limit=-1")
  const projects = await response.json()
  store.commit( "updateProjects", projects )
}
