import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/mon_restaurant',
    name: 'monRestaurant',
    component: () => import('../views/Restaurateur/RestaurantInformation.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
