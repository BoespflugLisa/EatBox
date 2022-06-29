import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

import {isLoggedIn, getRole} from "../utils/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

    //RESTAURANT :
    {
        path: '/',
        name: 'home',
        component: () => import('../views/DashBoard.vue'),
        meta: {requiresAuth: true},
        beforeEnter(to, from, next) {
            const isUser = getRole()
            switch (isUser) {
                case "Restaurant":
                    next({name: 'Dashboard'})
                    break;

                case "Client":
                    next({name: 'AccueilClient'})
                    break;

                case "Livreur":
                    next({name: 'DeliveryList'})
                    break;
            }
        }
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashBoard.vue'),
        meta: {requiresAuth: true, isUser: 'Restaurant'},
    },
    {
        path: '/Carte',
        name: ' ArticlesEtMenus',
        component: () => import('../views/Restaurateur/ArticlesEtMenus.vue'),
        meta: {requiresAuth: true, isUser: 'Restaurant'}
    },
    {
        path: '/MonRestaurant',
        name: 'MonRestaurant',
        component: () => import('../views/Restaurateur/RestaurantInformation.vue'),
        meta: {requiresAuth: true, isUser: 'Restaurant'}
    },
    {
        path: '/ScanRestaurant',
        name: 'ScanRestaurant',
        component: () => import('../components/Restaurateur/ScanRestaurant.vue'),
        meta: {requiresAuth: true, isUser: 'Restaurant'},
    },
    {
        path: '/Stats',
        name: 'Stats',
        component: () => import('../views/Restaurateur/RestaurantStats.vue'),
        meta: {requiresAuth: true, isUser: 'Restaurant'}
    },
    {
        path: '/Commandes',
        name: 'commandes',
        component: () => import('../views/Restaurateur/Command/CommandsList.vue'),
        meta: {requiresAuth: true, isUser: 'Restaurant'}
    },
    {
        path: '/Commandes/Details/:id',
        name: 'commandeDetails',
        component: () => import('../views/Restaurateur/Command/CommandDetails.vue'),
        meta: {requiresAuth: true, isUser: 'Restaurant'}
    },

    // DELIVERYMAN
    {
        path: '/DeliveryList',
        name: 'DeliveryList',
        component: () => import('../views/Livreur/DeliveryList.vue'),
        meta: {requiresAuth: true, isUser: 'Livreur'}
    },

    {
        path: '/DeliveryDetail/:id',
        name: 'DeliveryDetail',
        component: () => import('../views/Livreur/DeliveryDetail.vue'),
        meta: {requiresAuth: true, isUser: 'Livreur'}
    },

    // CLIENT
    {
        path: '/Accueil',
        name: 'AccueilClient',
        component: () => import('../views/Client/AccueilClient.vue'),
        meta: {requiresAuth: true, isUser: 'Client'},

    },
    {
        path: '/DetailRestaurant/:id',
        name: 'ClientRestaurantDetail',
        component: () => import('../views/Client/ClientRestaurantDetail.vue'),
        meta: {requiresAuth: true, isUser: 'Client'},
    },
    {
        path: '/Cart',
        name: 'Cart',
        component: () => import('../views/Client/Cart.vue'),
        meta: {requiresAuth: true, isUser: 'Client'},
    },
    /*  {
        path: '/Payement',
        name: 'PaymentClient',
        component: () => import('../views/Client/PaymentClient.vue'),
        meta: { requiresAuth: true, isUser: 'Client'},
      },*/

    // COMMUN

    {
        path: '/MonProfil',
        name: 'UserProfile',
        component: () => import('../views/UserProfile.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/Notifications',
        name: 'Notifications',
        component: () => import('../views/NotificationList.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/Connexion',
        name: 'LoginRegister',
        component: () => import('../views/LoginRegister.vue'),
        meta: {requiresAuth: false}
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (to.meta.requiresAuth && !isLoggedIn() || !to.meta.isUser === getRole()) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        next({
            path: '/Connexion',
            query: {redirect: to.fullPath}
        })
    }
    next(() => '/')

})

export default router
