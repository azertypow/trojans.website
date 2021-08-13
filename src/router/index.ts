import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "ViewHome" */ '../views/ViewHome.vue'),
    meta: {
      title: 'Welcome on the Trojans Collective website!', // /!\ \\ the value need to be the of of meta in /public/index.html
      description:
`We are the Trojans Collective, an international design group. We navigate three main axes of work: Spatial Installation, Graphic Communication, and Film.`
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "ViewProjects" */ '../views/ViewAbout.vue'),
    meta: {
      title: 'About the Trojans Collective',
      description:
`Trojans Collective is a design group by Helena, Jeanne, Jessica and Netillo. Our goal is to expand the field of design through experimentation and research.`
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "ViewProjects" */ '../views/ViewProjects.vue'),
    meta: {
      title: 'List of curated projects by the Trojans Collective.',
      description:
`Curated list of Trojans Collective works.`
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to) => {

  console.log( to.meta )

  document.title = to.meta.title as string
  document.querySelector("meta[name=description]")!.setAttribute("content", to.meta.description as string)

})

export default router
