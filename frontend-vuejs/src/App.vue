<template>
    <v-app>
        <v-app-bar
            app color="primary"
        >
            <v-app-bar-nav-icon
                @click="displayMenu()"
                color="white"
            />

            <router-link to="/" class="ma-auto">
                <v-img
                    max-width="100"
                    :src="this.eatBoxLogo"
                />
            </router-link>

            <v-btn v-if="this.$cookies.get('auth')" icon to="/notifications">
                <v-icon color="white">
                    mdi-bell
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            width="320" index fixed
            v-if="this.$cookies.get('auth')"
        >
            <div class="pa-3 pb-0 ml-auto">
                <v-btn
                    icon
                    @click="displayMenu()"
                >
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </div>
            <!--  MENU @Restaurant-->
            <RestaurantSidebar v-if="this.$cookies.get('role')==='Restaurant'"/>
            <template v-slot:append>
                <div class="d-flex justify-center flex-column pa-5">
                    <v-btn
                        to="/mon_Restaurant?tab=2"
                        color="tertiary black--text"
                        class="pr-10 pl-10"
                    >
                        Parrainer
                    </v-btn>

                    <v-btn
                        color="secondary white--text"
                        class="pr-10 pl-10 mt-5"
                        @click="logout()"
                    >
                        Se déconnecter
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-navigation-drawer
            v-model="drawer"
            width="320" index fixed
            v-else>
            <div class="pa-3 pb-0 ml-auto">
                <v-btn
                    icon
                    @click="displayMenu()"
                >
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </div>
            <div class="d-flex justify-center flex-column pa-5 pt-2">
                <v-btn
                    color="tertiary black--text"
                    class="pr-10 pl-10"
                    to="/connexion"
                >
                    Se connecter
                </v-btn>
            </div>

        </v-navigation-drawer>

        <div class="content">
            <router-view v-on:change-theme="changeTheme()"/>
        </div>
    </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import RestaurantSidebar from "./components/Restaurateur/RestaurantSidebar.vue"
import {logoutUser} from './utils/auth.js'

@Component({
    components: {
        ValidationObserver,
        ValidationProvider,
        RestaurantSidebar,
    },
})

export default class App extends Vue {

    eatBoxLogo = '';
    drawer = false;
    value = '';

    notificationConnection: WebSocket|null = null

    mounted() {
        this.changeTheme()
        if (this.$cookies.get("auth"))
            this.connectNotificationWS()
    }

    logout() {
        logoutUser()
        this.changeTheme()
        this.$router.push('/connexion')
    }

    displayMenu() {
        this.drawer = !this.drawer;
    }

    changeTheme() {
        switch (this.$cookies.get('role')) {
            case "Client":
                this.$vuetify.theme.themes.light.primary = '#2D5D62';
                this.$vuetify.theme.themes.light.secondary = '#77A8A3';
                this.$vuetify.theme.themes.light.accent = '#A1C7C7';
                this.$vuetify.theme.themes.light.tertiary = '#B9D3CD';
                this.eatBoxLogo = require('./assets/img/EatBox.png');
                break;

            case "Restaurant":
                this.$vuetify.theme.themes.light.primary = '#751A2C';
                this.$vuetify.theme.themes.light.secondary = '#B33A3A';
                this.$vuetify.theme.themes.light.accent = '#D57056';
                this.$vuetify.theme.themes.light.tertiary = '#e1e1e1';
                this.eatBoxLogo = require('./assets/img/EatBoxRestaurateur.png');
                break;

            case "Livreur":
                this.$vuetify.theme.themes.light.primary = '#43846B';
                this.$vuetify.theme.themes.light.secondary = '#B0BBA7';
                this.$vuetify.theme.themes.light.accent = '#F3E0D7';
                this.$vuetify.theme.themes.light.tertiary = '#F3E0D7';
                this.eatBoxLogo = require('./assets/img/EatBoxDeliveryman.png');
                break;

            default:
                this.$vuetify.theme.themes.light.primary = '#2D5D62';
                this.$vuetify.theme.themes.light.secondary = '#77A8A3';
                this.$vuetify.theme.themes.light.accent = '#A1C7C7';
                this.$vuetify.theme.themes.light.tertiary = '#B9D3CD';
                this.eatBoxLogo = require('./assets/img/EatBox.png');
                break;
        }
    }

    async connectNotificationWS() {
        this.notificationConnection = await new WebSocket("ws://localhost:3033/notifications/socket/idclem"/*+this.$cookies.get("user_id")*/)



        this.notificationConnection.onopen = function(event) {
            console.log(event)
            console.log("Successfully connected to the echo websocket server...")
        }

        this.notificationConnection.onmessage = function(event) {
            console.log(event);
        }
    }

}
</script>

<style>
.content {
    padding-top: 64px !important;
    padding-bottom: 30px !important;
}

@media screen and (max-width: 960px) {
    .content {
        padding-top: 56px !important;
    }
}
</style>