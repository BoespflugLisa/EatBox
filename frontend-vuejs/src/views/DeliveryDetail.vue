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
                <p class="mb-2 font-weight-bold">Adresse du restaurant : {{ this.RestaurantAdresse }}</p>
                <p class="mb-2 font-weight-bold">Adresse de livraison : {{ this.myAdresse }}</p>
                <p class="mb-2 font-weight-bold">Numéro de téléphone client : {{ this.numTel }}</p>
            </v-card-text>

        </v-card>

        <v-card
            class="mx-auto mt-3"
            max-width="470"
            outlined
            v-if="this.stateNumber === 2"
        >
            <v-card-title>QR code de la commande</v-card-title>
            <v-card-text>
                <div class="align-center d-flex justify-center">
                    <vue-qr :text=this.token :callback="test" qid="testid"></vue-qr>
                </div>
            </v-card-text>
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


export default {
    components: {
        VueQr,

    },

    data() {
        return {
            dialogDelete: false,
            token: this.$cookies.get('user_id'),
            src: '',
            commandState: '',
            idClient: '',
            states: ['En attente de validation restaurant', 'En préparation', 'Restaurant en attente du livreur', 'En livraison', 'Livré', '', 'Commande refusée'],
            numTel: '',
            myAdresse: null,
            stateNumber: 0,
            RestaurantAdresse: null,
            orderID : ""
        }

    },

    created() {
        this.orderID = this.$route.params.id;
    },

    methods: {
        /*test(dataUrl, id) {
            console.log(this.token, id, dataUrl)
        },*/

    },

    async mounted() {
        await this.$axios.get(`orders/` + this.orderID )
            .then(response => {
                this.stateNumber = response.data.order.State
                this.commandState = this.states[response.data.order.State]
                this.idClient = response.data.order.Client._id
                this.myAdresse = response.data.order.Client.Address.Number + ' ' + response.data.order.Client.Address.Street + ' , ' + response.data.order.Client.Address.Town + ' , ' + response.data.order.Client.Address.Code
                this.RestaurantAdresse = response.data.order.Restaurant.Address.Number + ' ' + response.data.order.Restaurant.Address.Street + ' , ' + response.data.order.Restaurant.Address.Town + ' , ' + response.data.order.Restaurant.Address.Code
            })


    }

}
</script>

<style scoped>

</style>

