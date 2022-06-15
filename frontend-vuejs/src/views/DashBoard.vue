<template>

    <div id="dashboard">


        <div class="d-flex justify-center pt-7 ">

            <h2>
                Bonjour, {{ this.restaurantName }}

            </h2>
        </div>

        <div class="d-flex justify-center pt-7">
            <v-btn block>

                Gestion des commandes
            </v-btn>
        </div>

        <div class="d-flex  pt-7 ">

            <h1>
                Quelques statistiques...

            </h1>
        </div>

        <div class="d-flex justify-center pt-7">

            <v-card elevation="2" width="100%" color="accent">

                <v-card-text class="text-center font-weight-bold" >
                    Nombres de commande ce mois-ci :
                    <p class="font-40 mt-4">{{ this.nbCommandes }}</p>
                </v-card-text>

            </v-card>
        </div>

        <div class="d-flex justify-center pt-7">
            <v-btn block>

                Gestion des commandes
            </v-btn>
        </div>


    </div>


</template>

<script>
export default {
    data: function () {
        return {
            restaurantName: "Taco Bruno",
            nbCommandes: 6,
        }
    },

};
</script>

