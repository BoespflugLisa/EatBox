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

            <v-btn icon to="/notifications">
                <v-icon color="white">
                    mdi-bell
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            temporary absolute width="320"
            class="main-menu" height="100vh"
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
            <div class="d-flex justify-center flex-column pa-5 pt-2">
                <v-btn
                    color="tertiary black--text"
                    class="pr-10 pl-10"
                >
                    Mon restaurant
                </v-btn>


                <v-btn
                    color="tertiary black--text"
                    class="pr-10 pl-10 mt-5"
                    to="/card" tag="button"
                >
                    Gestion de la carte
                </v-btn>


                <v-btn
                    color="tertiary black--text"
                    class="pr-10 pl-10 mt-5"
                >
                    Gestion des commandes
                </v-btn>

                <v-btn
                    color="tertiary black--text"
                    class="pr-10 pl-10 mt-5"
                >
                    Statistiques avancées
                </v-btn>
            </div>
            <template v-slot:append>
                <div class="d-flex justify-center flex-column pa-5">
                    <v-btn
                        color="tertiary black--text"
                        class="pr-10 pl-10"
                    >
                        Parrainer
                    </v-btn>

                    <v-btn
                        color="secondary white--text"
                        class="pr-10 pl-10 mt-5"
                    >
                        Se déconnecter
                    </v-btn>
                </div>
            </template>

        </v-navigation-drawer>

        <div class="content">
            <router-view/>
        </div>
    </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver, ValidationProvider} from 'vee-validate';

@Component({
    components: {
        ValidationObserver,
        ValidationProvider
    },
})

export default class App extends Vue {
    connectedUserRole = "Restaurateur";
    eatBoxLogo = '';
    drawer = false;

    value = '';

    created() {
        this.changeTheme();
    }

    changeTheme() {
        switch (this.connectedUserRole) {
            case "Client": {
                this.$vuetify.theme.themes.light.primary = '#2D5D62';
                this.$vuetify.theme.themes.light.secondary = '#77A8A3';
                this.$vuetify.theme.themes.light.accent = '#A1C7C7';
                this.$vuetify.theme.themes.light.tertiary = '#B9D3CD';
                this.eatBoxLogo = require('./assets/img/EatBox.png');
                break;
            }

            case "Restaurateur":
                this.$vuetify.theme.themes.light.primary = '#751A2C';
                this.$vuetify.theme.themes.light.secondary = '#B33A3A';
                this.$vuetify.theme.themes.light.accent = '#D57056';
                this.$vuetify.theme.themes.light.tertiary = '#e1e1e1';
                this.eatBoxLogo = require('./assets/img/EatBoxRestaurateur.png');
                break;

            case "Deliveryman":
                this.$vuetify.theme.themes.light.primary = '#43846B';
                this.$vuetify.theme.themes.light.secondary = '#B0BBA7';
                this.$vuetify.theme.themes.light.accent = '#F3E0D7';
                this.$vuetify.theme.themes.light.tertiary = '#F3E0D7';
                this.eatBoxLogo = require('./assets/img/EatBoxDeliveryman.png');
                break;
        }
    }

    displayMenu() {
        this.drawer = !this.drawer;
    }
}
</script>

<style>
p {
    margin-bottom: 0 !important;
}


.content {
    padding-top: 64px !important;
    padding-bottom: 30px !important;
}

@media screen and (max-width: 960px) {
    .content {
        padding-top: 56px !important;
    }
}

.font-12 {
    font-size: 12px;
}

.font-14 {
    font-size: 14px;
}

.font-16 {
    font-size: 16px;
}

.font-18 {
    font-size: 18px;
}

.font-20 {
    font-size: 20px;
}

.font-20 {
    font-size: 20px;
}

.font-25 {
    font-size: 25px;
}

.font-30 {
    font-size: 30px;
}

.font-40 {
    font-size: 40px;
}
</style>