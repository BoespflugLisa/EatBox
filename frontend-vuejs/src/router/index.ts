import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import ArticlesEtMenus from '../views/ArticlesEtMenus.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard

  },
  {
    path: '/card',
    name: ' ArticlesEtMenus',
    component: ArticlesEtMenus

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
