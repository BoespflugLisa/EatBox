import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios, {AxiosStatic} from 'axios'
import * as VueCookies from "vue-cookies";
import "./plugins/vee-validate"

import './assets/CSS/main.scss'

Vue.use(VueCookies, {expire: '1d'});

Vue.config.productionTip = false

const axios_gateway = axios.create({
    baseURL: 'http://localhost:3000',
});

Vue.prototype.$axios = axios_gateway;

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosStatic;
    }
}

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
