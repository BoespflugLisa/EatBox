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
  {
    path: '/mon_restaurant',
    name: 'MonRestaurant',
    component: () => import('../views/Restaurateur/RestaurantInformation.vue')
  },

  {
    path: '/mon_profil',
    name: 'ProfileView',
    component: () => import('../views/ProfileView.vue')
  },

  {
    path: '/OpenToWork',
    name: 'OpenToWork',
    component: () => import('../views/OpenToWork.vue')
  },

  {
    path: '/DeliveryList',
    name: 'DeliveryList',
    component: () => import('../views/DeliveryList.vue')
  },

  {
    path: '/DeliveryDetail',
    name: 'DeliveryDetail',
    component: () => import('../views/DeliveryDetail.vue')
  },


  {
    path: '/ScanRestaurant',
    name: 'ScanRestaurant',
    component: () => import('../views/ScanRestaurant.vue')
  },

  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/NotificationList.vue')
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('../views/Restaurateur/RestaurantStats.vue')
  },
  {
    path: '/commandes',
    name: 'commandes',
    component: () => import('../views/Restaurateur/Command/CommandsList.vue')
  },
  {
    path: '/commandes/details/:id',
    name: 'commandeDetails',
    component: () => import('../views/Restaurateur/Command/CommandDetails.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
