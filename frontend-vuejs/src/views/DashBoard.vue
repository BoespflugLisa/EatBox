

<template>

    <div id="dashboard">


        <div class="d-flex justify-center pt-7 ">

            <h2>
                Bonjour, {{ this.restaurantName }}

            </h2>
        </div>

        <div class="d-flex justify-center pt-7">
            <v-btn block rounded color="secondary" large>

                Gestion des commandes
            </v-btn>
        </div>

        <div class="d-flex  pt-7 ">

            <h1>
                Quelques statistiques...

            </h1>
        </div>

        <div class="d-flex justify-center pt-7">

            <v-card elevation="2" width="100%" color="accent" >

                <v-card-text class="text-center dark--text" >
                    <p  class="font-weight-bold">Nombres de commande ce mois-ci :</p>
                    <p class="font-40 mt-4">{{ this.nbCommandes }}</p>
                </v-card-text>

            </v-card>
        </div>

        <div class="d-flex justify-center pt-7">

            <v-card elevation="2" width="100%" color="accent">

                <v-card-text class="text-center dark--text " >
                    <p class="font-weight-bold">Moyenne des notes des derniers clients : </p>
                    <p class="font-40 mt-4">{{ this.moyenneNote }}
                        <v-icon color="dark" large>
                            mdi-star
                        </v-icon>
                    </p>
                </v-card-text>

            </v-card>
        </div>

        <div class="d-flex justify-space-between  pt-7 align-center">

            <v-card elevation="2" width="45%" color="accent" >

                <v-card-text class="text-center dark--text " >
                    <p class="font-weight-bold"> Recette du mois : </p>
                    <p class="font-40 mt-4">{{ nFormatter(this.recetteDuMois,1) }} €</p>
                </v-card-text>

            </v-card>



            <v-card elevation="2" width="45%"   color="accent"  >

                <v-card-text  class="text-center  dark--text  " >
                    <p class="font-20 ">En savoir plus </p>

                </v-card-text>

            </v-card>



        </div>

    </div>


</template>

<script>

export default {

    data: function () {
        return {
            restaurantName: null,
            nbCommandes: null,
            moyenneNote: null,
            recetteDuMois: null,

        }
    },

    mounted() {
        this.$axios.get(`stats/62b04dcfff5bc1bbf9802446`)
            .then(response => {
                console.log(response.data.data);
                this.restaurantName = response.data.data.belongs_to;
                this.nbCommandes = response.data.data.NbOrders;
                this.moyenneNote = response.data.data.MeanNotes;
                this.recetteDuMois = response.data.data.Benefit;
            })

            /*.then(function(response){
                console.log(response.data.data)
                //this.restaurantName = "Taco Bruno";
                this.nbCommandes = response.data.data.NbOrders;
                this.moyenneNote = response.data.data.MeanNotes;
                this.recetteDuMois = this.nFormatter(response.data.data.benefits,1);
            })*/
    },

    methods: {
        nFormatter(num, digits) {
            let si = [
                { value: 1, symbol: "" },
                { value: 1E3, symbol: "k" },
                { value: 1E6, symbol: "M" },
                { value: 1E9, symbol: "G" },
                { value: 1E12, symbol: "T" },
                { value: 1E15, symbol: "P" },
                { value: 1E18, symbol: "E" }
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
    },




};
</script>

