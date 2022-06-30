<template>
    <div id="dashboard">
        <div><v-alert
            color="accent"
            shaped
            text
            type="error"
            @click="this.ReturnError = false"
            v-show="this.ReturnError"
        >
            {{this.error_login}}
        </v-alert>
        </div>
        <div class="d-flex justify-center pt-7 ">


            <h2>
                Bonjour, {{ this.stats.restaurantName }}

            </h2>
        </div>

        <div class="d-flex justify-center pt-7">
            <v-btn block rounded color="secondary" to="/commandes" large>

                Gestion des commandes
            </v-btn>
        </div>

        <div class="d-flex  pt-7 ">

            <h1>
                Quelques statistiques...
            </h1>
        </div>

        <div class="d-flex justify-center pt-7">

            <v-card elevation="2" width="100%" color="tertiary">

                <v-card-text class="text-center dark--text">
                    <p class="font-weight-bold">Nombres de commande ce mois-ci :</p>
                    <p class="font-40 mt-4">{{ nFormatter(this.stats.nbCommandes, 1) }}</p>
                </v-card-text>

            </v-card>
        </div>

        <div class="d-flex justify-center pt-7">
            <v-card elevation="2" width="100%" color="tertiary">
                <v-card-text class="text-center dark--text ">
                    <p class="font-weight-bold">Moyenne des notes des derniers clients : </p>
                    <p class="font-40 mt-4">{{ this.stats.moyenneNote }}
                        <v-icon color="dark" large>
                            mdi-star
                        </v-icon>
                    </p>
                </v-card-text>
            </v-card>
        </div>

        <div class="d-flex justify-center pt-7">
            <v-card elevation="2" width="100%" color="tertiary">
                <v-card-text class="text-center dark--text ">
                    <p class="font-weight-bold"> Recette du mois : </p>
                    <p class="font-25 mt-4">{{ nFormatter(this.stats.recetteDuMois, 1) }} €</p>
                </v-card-text>
            </v-card>
        </div>

        <div class="d-flex justify-center">
            <v-btn to="/stats" color="secondary" class="mt-7" rounded>
                En savoir plus
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class DashboardRestaurant extends Vue {

    ReturnError = false
    error_login = ""

    stats = {
        restaurantName : null,
        nbCommandes : null,
        moyenneNote : null,
        recetteDuMois : null,
    }

    mounted() {
        this.$axios.get(`stats/`+this.$cookies.get('user_id'))
            .then(response => {
                this.stats.restaurantName = response.data.stat.belongs_to.Name;
                this.stats.nbCommandes = response.data.stat.NbOrders;
                this.stats.moyenneNote = response.data.stat.MeanNotes;
                this.stats.recetteDuMois = response.data.stat.Benefit;
            })
            .catch(err=>{
                this.ReturnError = true;
                this.error_login = err.response.data.message
            })
    }


    nFormatter(num, digits) {
        let si = [
            {value: 1, symbol: ""},
            {value: 1E3, symbol: "k"},
            {value: 1E6, symbol: "M"},
            {value: 1E9, symbol: "G"},
            {value: 1E12, symbol: "T"},
            {value: 1E15, symbol: "P"},
            {value: 1E18, symbol: "E"}
        ];
        let rx = /\.0+$|(\.\d*[1-9])0+$/;
        let i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }


}
</script>


<style scoped>

</style>