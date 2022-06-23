import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import DashBoard from '../views/DashBoard.vue'
import TestView from '../views/TestView.vue'
import ArticlesEtMenus from '../views/ArticlesEtMenus.vue'

import { isLoggedIn, getRole } from "../utils/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/test',
    name: 'TestView',
    component: TestView,
    meta : {requiresAuth: false}

  },
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard,
    meta: { requiresAuth: true }

  },
  {
    path: '/card',
    name: ' ArticlesEtMenus',
    component: ArticlesEtMenus,
    meta: { requiresAuth: true, isUser : 'Restaurant' }
  },
  {
    path: '/mon_restaurant',
    name: 'MonRestaurant',
    component: () => import('../views/Restaurateur/RestaurantInformation.vue'),
    meta: { requiresAuth: true, isUser : 'Restaurant' }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/NotificationList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/commandes',
    name: 'commandes',
    component: () => import('../views/Restaurateur/Command/CommandsList.vue'),
    meta: { requiresAuth: true, isUser : 'Restaurant' }
  },
  {
    path: '/commandes/details/:id',
    name: 'commandeDetails',
    component: () => import('../views/Restaurateur/Command/CommandDetails.vue'),
    meta: { requiresAuth: true, isUser : 'Restaurant' }
  },
  {
    path: '/connexion',
    name: 'LoginRegister',
    component: () => import('../views/LoginRegister.vue'),
    meta: { requiresAuth: false }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) =>{
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (to.meta.requiresAuth && !isLoggedIn() || to.meta.isUser === getRole()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    next('connexion')
  }
      next(() => '/')

})

export default router
