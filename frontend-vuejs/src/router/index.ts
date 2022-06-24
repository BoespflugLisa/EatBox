import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { isLoggedIn, getRole } from "../utils/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'DashBoard',
    component: () => import('../views/DashBoard.vue'),
    meta: { requiresAuth: true }

  },
  {
    path: '/card',
    name: ' ArticlesEtMenus',
    component: () => import('../views/Restaurateur/ArticlesEtMenus.vue'),
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
    path: '/stats',
    name: 'Stats',
    component: () => import('../views/Restaurateur/RestaurantStats.vue'),
    meta : {requiresAuth: true, isUser : 'Restaurant'}
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
  if (to.meta.requiresAuth && !isLoggedIn() || !to.meta.isUser === getRole()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    next({
      path: '/connexion',
      query: { redirect: to.fullPath }
    })
  }
      next(() => '/')

})

export default router
