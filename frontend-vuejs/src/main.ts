import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios, {Axios, AxiosStatic} from 'axios'
import * as VueCookies from "vue-cookies";
import "./plugins/vee-validate"

import './assets/CSS/main.scss'

Vue.use(VueCookies, {expire : '1d'});

Vue.config.productionTip = false

const axios_nosql = axios.create({
    baseURL:'http://localhost:3031',
});

const axios_login = axios.create({
    baseURL:'http://localhost:3032',
});

Vue.prototype.$axios = axios_nosql;
Vue.prototype.$axios_login = axios_login;

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosStatic;
        $axios_login: AxiosStatic;
    }
}

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
