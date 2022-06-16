<template>
    <v-app>
        <v-app-bar
            app color="primary"
        >
            <v-app-bar-nav-icon
                @click="displayMenu()"
                color="white"
            />
            <v-img
                max-width="100"
                :src="this.EatBoxLogo"
                class="ma-auto"
            >
            </v-img>
            <v-btn icon>
                <v-icon color="white">
                    mdi-bell
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            temporary absolute width="320"
            class="main-menu"
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
                    color="accent black--text"
                    class="pr-10 pl-10"
                >
                    Mon restaurant
                </v-btn>

                <v-btn
                    color="accent black--text"
                    class="pr-10 pl-10 mt-5"
                >
                    Gestion de la carte
                </v-btn>

                <v-btn
                    color="accent black--text"
                    class="pr-10 pl-10 mt-5"
                >
                    Gestion des commandes
                </v-btn>

                <v-btn
                    color="accent black--text"
                    class="pr-10 pl-10 mt-5"
                >
                    Statistiques avancées
                </v-btn>
            </div>
            <div class="d-flex justify-center flex-column pa-5 main-menu-bottom">
                <v-btn
                    color="accent black--text"
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
        </v-navigation-drawer>

        <v-main class="content">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>


export default {
    name: 'App',

    data: function () {
        return {
            connectedUserRole: "Deliveryman",
            EatBoxLogo: '',
            drawer: false,
        }
    },

    created() {
        this.changeTheme();
    },

    methods: {
        changeTheme() {
            switch (this.connectedUserRole) {
                case "Client":
                    this.$vuetify.theme.themes.light.primary = '#2D5D62';
                    this.$vuetify.theme.themes.light.secondary = '#77A8A3';
                    this.$vuetify.theme.themes.light.accent = '#A1C7C7';
                    this.$vuetify.theme.themes.light.anchor = '#B9D3CD';
                    this.EatBoxLogo = "./img/EatBox.png";
                    break;

                case "Restaurateur":
                    this.$vuetify.theme.themes.light.primary = '#751A2C';
                    this.$vuetify.theme.themes.light.secondary = '#B33A3A';
                    this.$vuetify.theme.themes.light.accent = '#D57056';
                    this.$vuetify.theme.themes.light.anchor = '#FFDAC8';
                    this.EatBoxLogo = "./img/EatBoxRestaurateur.png";
                    break;

                case "Deliveryman":
                    this.$vuetify.theme.themes.light.primary = '#43846B';
                    this.$vuetify.theme.themes.light.secondary = '#B0BBA7';
                    this.$vuetify.theme.themes.light.accent = '#F3E0D7';
                    this.$vuetify.theme.themes.light.anchor = '#F3E0D7';
                    this.EatBoxLogo = "./img/EatBoxDeliveryman.png";
                    break;
            }
        },

        displayMenu() {
            this.drawer = this.drawer !== true;
        }
    }
};
</script>

<style>
.main-menu-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.content {
    padding: 64px 10% 0 10%!important;
    display: flex;
    justify-content: center;
}

@media screen and (min-width: 768px) {
    .content {
        padding: 64px 20% 0 20%!important;
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
</style>