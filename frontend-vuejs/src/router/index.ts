import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import TestView from '../views/TestView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/test',
    name: 'TestView',
    component: TestView

  },
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
