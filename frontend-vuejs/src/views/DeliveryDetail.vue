<template>
    <div class="side-padding">


        <v-card
          class="mx-auto mt-3"
          max-width="470"
          outlined
        >
            <v-card-title>
                Etat de la commande
            </v-card-title>
            <v-list-item three-line>
                <v-list-item-content>

                    <div class="flex-wrap d-flex text-h5 mb-1">
                        {{ this.commandState }}
                    </div>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="70"
                  color="grey">
                    <v-img
                      src="../assets/img/sacrifice.gif">
                    </v-img>
                </v-list-item-avatar>
            </v-list-item>

        </v-card>


        <v-card
          class="mx-auto mt-3"
          max-width="470"
          outlined
        >
            <v-card-title>Contact</v-card-title>

            <v-card-text>
                <p class="mb-2">Adresse du restaurant : {{ this.RestaurantAdresse }}</p>
                <p class="mb-2">Adresse de livraison : {{ this.myAdresse }}</p>
                <p class="mb-2">Numéro de tél : {{ this.numTel }}</p>

            </v-card-text>

        </v-card>

        <v-card
          class="mx-auto mt-3"
          max-width="470"
          outlined
          v-if="this.stateNumber === 2"
        >
            <v-card-title>QR code de la commande </v-card-title>
        <div class="align-center d-flex justify-center">
            <vue-qr :text=this.token :callback="test" qid="testid"></vue-qr>
        </div>
        </v-card>


        <div v-if="this.stateNumber === 3" class="align-center d-flex justify-center mt-5">
            <v-btn rounded color="secondary" large @click="dialogDelete=true">
                Livaison terminée
            </v-btn>
        </div>


        <v-dialog
          v-model="dialogDelete"
          width="300"
          v-if="dialogDelete"
        >
            <v-card class="text-end">
                <v-card-title>
                    Livraison terminée ?
                </v-card-title>

                <v-btn

                  to="/DeliveryList"
                  color="primary"
                  text
                >
                    Valider
                </v-btn>
                <v-btn

                  @click="dialogDelete =false"
                  color="primary"
                  text
                >
                    Retour
                </v-btn>


            </v-card>

        </v-dialog>

    </div>
</template>

<script>
import VueQr from 'vue-qr';
import axios from "axios";


export default {


    components: {
        VueQr,

    },

    data() {
        return {
            dialogDelete: false,
            token: "string",
            src: '',
            commandState: '',
            idClient: '',
            states: ['En attente de validation restaurant', 'En préparation', 'Restaurant en attente du livreur', 'En livraison', 'Livré', '','Commande refusée'],
            numTel: '',
            myAdresse: null,
            stateNumber:0,
            RestaurantAdresse: null,
        }

    },

    methods: {
        test(dataUrl, id) {
            console.log(this.token, id)
        },


    },

    async mounted() {
        await this.$axios.get(`orders/62b42f825b8ad063a37b74d9`)
          .then(response => {
              this.stateNumber = response.data.order.State
              this.commandState = this.states[response.data.order.State]
              this.idClient = response.data.order.Client.Client_ID._id
              this.myAdresse = response.data.order.Client.Client_ID.Address.Number + ' ' + response.data.order.Client.Client_ID.Address.Street + ' , ' + response.data.order.Client.Client_ID.Address.Town + ' , ' + response.data.order.Client.Client_ID.Address.Code
              //this.RestaurantAdresse =  response.data.order.


          })


    }

}
</script>

<style scoped>

</style>

