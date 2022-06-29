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
                <v-badge
                    :content="notifDisplay"
                    :value="notifDisplay"
                    color="red"
                    overlap
                >
                    <v-icon color="white">
                        mdi-bell
                    </v-icon>
                </v-badge>
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
            <restaurant-sidebar v-if="this.$cookies.get('role')==='Restaurant'"/>
            <client-sidebar v-if="this.$cookies.get('role')==='Client'"/>
            <template v-slot:append>
                <div class="d-flex justify-center flex-column pa-5">
                    <v-btn
                        :to="role === 'Restaurant' ? '/MonRestaurant?tab=2' : '/MonProfil?tab=1'"
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
            <router-view
                v-on:change-theme="changeTheme()"
                v-on:remove-notif="removeNotification()"
                v-on:remove-all-notif="removeAllNotification()"
            />
        </div>
    </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import RestaurantSidebar from "./components/SideBar/RestaurantSidebar.vue"
import ClientSidebar from "./components/SideBar/ClientSidebar.vue"
import {logoutUser} from './utils/auth.js'

@Component({
    components: {
        ValidationObserver,
        ValidationProvider,
        RestaurantSidebar,
        ClientSidebar,
    },
})

export default class App extends Vue {
    eatBoxLogo = '';
    drawer = false;
    value = '';
    notifCount = 0;
    notifDisplay: number | string = 0;

    role = this.$cookies.get('role');

    notificationConnection: WebSocket | null = null;

    mounted() {
        this.changeTheme()
        this.getNotificationCount()
    }

    updated() {
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

    getNotificationCount() {
        if (this.$cookies.get("auth")) {
            this.$axios_notifications.get("/notifications/userCount/" + this.$cookies.get('user_id')).then(response => {
                this.notifCount = response.data.count;
                if (response.data.count > 9)
                    this.notifDisplay = "9+";
                else
                    this.notifDisplay = response.data.count;
            });
        }
    }

    removeNotification() {
        this.notifCount--;
        if (this.notifCount > 9)
            this.notifDisplay = "9+";
        else
            this.notifDisplay = this.notifCount;
    }

    removeAllNotification() {
        this.notifCount = 0;
        this.notifDisplay = 0;
    }

    addNotification() {
        this.notifCount++;
        if (this.notifCount > 9)
            this.notifDisplay = "9+";
        else
            this.notifDisplay = this.notifCount;
    }

    async connectNotificationWS() {
        if (this.$cookies.get("auth") && this.notificationConnection === null) {
            this.notificationConnection = await new WebSocket("ws://localhost:3033/notifications/socket/notifications/" + this.$cookies.get("user_id"))

            this.notificationConnection.onmessage = () => {
                this.addNotification();
            }

            this.notificationConnection.onclose = () => {
                this.notificationConnection = null
            }
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