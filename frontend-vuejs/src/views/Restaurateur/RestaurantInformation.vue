<template>
    <div id="restaurant-information">
        <v-card>
            <v-tabs fixed-tabs v-model="tab">
                <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item.tab">
                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h2>Informations du restaurant</h2>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Nom du restaurant</h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ restaurantName }}</h7>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Type de nourriture proposé </h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ foodType }}</h7>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Horaires</h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>Lun. : {{ LunTime }}</h7>
                        <br>
                        <h7>Mar. : {{ MarTime }}</h7>
                        <br>
                        <h7>Mer. : {{ MerTime }}</h7>
                        <br>
                        <h7>Jeu. : {{ JeuTime }}</h7>
                        <br>
                        <h7>Ven. : {{ VenTime }}</h7>
                        <br>
                        <h7>Sam. : {{ SamTime }}</h7>
                        <br>
                        <h7>Dim. : {{ DimTime }}</h7>
                    </div>

                    <div class="d-flex justify-center pt-5 pb-3 " v-if="item.tab ==='Commandes entrantes'">
                        <v-btn block rounded color="secondary" large>
                            Fermeture exceptionnelle
                        </v-btn>

                    </div>

                    <v-banner
                      v-model="v0"
                      single-line
                      transition="slide-y-transition"
                    ></v-banner>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h2>Informations de contact</h2>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Numéro de téléphone</h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ telephone }}</h7>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Adresse mail</h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ mail }}</h7>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Numéro de SIRET</h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ numSiret }}</h7>
                    </div>

                    <v-banner
                      v-model="v0"
                      single-line
                      transition="slide-y-transition"
                    ></v-banner>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h2>Informations banquaires</h2>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Nom du compte</h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ telephone }}</h7>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Identifiant BIC</h3>
                    </div>

                    <div class="mt-3 ml-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ mail }}</h7>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h3>Numéro IBAN</h3>
                    </div>

                    <div class="mt-3 ml-5 mb-5" v-if="item.tab ==='Commandes entrantes'">
                        <h7>{{ numSiret }}</h7>
                    </div>

                </v-tab-item>
            </v-tabs-items>
        </v-card>


    </div>
</template>

<script>
export default {
    name: "RestaurantInformation",

    data() {
        return {
            tab: 0,
            items: [
                {tab: "Commandes entrantes"},
                {tab: "Commandes en cours"},
                {tab: "Historique"},
            ],
            restaurantName: "tets",
            foodType: "tets",
            telephone: "tets",
            mail: "tets",
            numSiret: "tets",

            LunTime: "11h30-14h / 19h-23h30",
            MarTime: "11h30-14h / 19h-23h30",
            MerTime: "11h30-14h / 19h-23h30",
            JeuTime: "11h30-14h / 19h-23h30",
            VenTime: "11h30-14h / 19h-23h30",
            SamTime: "11h30-14h / 19h-23h30",
            DimTime: "Fermé.",
        };
    },
}
</script>

<style scoped>
@media screen and (min-width: 960px) {
    .info-menu {
        margin-top: 5px;
    }
}
</style>