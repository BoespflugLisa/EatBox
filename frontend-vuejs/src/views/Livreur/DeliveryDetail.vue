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
                        :src="require('@/assets/img/sacrifice.gif')">
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
                <p class="mb-2 font-weight-bold">Nom du restaurant : {{ this.restaurantName }}</p>
                <p class="mb-2 font-weight-bold">Adresse du restaurant : {{ this.restaurantAdresse }}</p>
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
                    <vue-qr :text=this.token qid="testid"></vue-qr>
                </div>
            </v-card-text>
        </v-card>


        <div v-if="this.stateNumber === 3" class="align-center d-flex justify-center mt-5">
            <v-btn rounded color="secondary" large @click="dialogDelete=true">
                Livaison terminée ?
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
                    @click="finishDelivery()"
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
            restaurantName: null,
            restaurantAdresse: null,
            orderID: "",
            orderConnection: null,
            order: {},
        }
    },

    created() {
        this.orderID = this.$route.params.id;
    },

    mounted() {
        this.getData();
        this.connectOrderWS();
    },

    methods: {
        async getData() {
            await this.$axios.get(`orders/` + this.orderID)
                .then(response => {
                    this.order = response.data.order;
                    this.articlesId = response.data.order.Detail.Articles;
                    this.menusId = response.data.order.Detail.Menus;
                    this.stateNumber = response.data.order.State;
                    this.commandState = this.states[response.data.order.State];
                    this.idClient = response.data.order.Client;

                    this.$axios.get("/users/restaurants/" + response.data.order.Restaurant).then(responseRestaurant => {
                        this.restaurantName = responseRestaurant.data.restaurant.Name;
                        this.restaurantAdresse = responseRestaurant.data.restaurant.Address.Number + ' ' + responseRestaurant.data.restaurant.Address.Street + ' , ' + responseRestaurant.data.restaurant.Address.Town + ' , ' + responseRestaurant.data.restaurant.Address.Code;
                    });

                    this.$axios.get('/users/clients/' + this.idClient).then(responseClient => {
                        this.myAdresse = responseClient.data.client.Address.Number + ' ' + responseClient.data.client.Address.Street + ' , ' + responseClient.data.client.Address.Town + ' , ' + responseClient.data.client.Address.Code
                        this.numTel = responseClient.data.client.Phone;
                    });
                })

        },

        finishDelivery() {
            this.order.State = 4
            this.$axios.put('orders/' + this.orderID, {data: this.order}).then(() => {
                this.$axios.post("/notifications/" + this.order.Client._id, {
                    data: {
                        action: "OrderIsFinish",
                        Types: {
                            Command: true,
                            Delivery: false,
                        }
                    }
                })
            })
            this.$axios.get('/users/deliverymen/' + this.$cookies.get('user_id')).then((response) => {
                response.data.livreur.Free = true;
                this.$axios.put("/users/deliverymen/update/" + this.$cookies.get('user_id'), {data: {
                    Free: response.data.livreur.Free,
                }})
            })
        },

        async connectOrderWS() {
            if (this.orderConnection === null) {
                this.orderConnection = await new WebSocket("ws://localhost:3034/orders/socket/" + this.$cookies.get('role') + "/" + this.$cookies.get("user_id"));

                this.orderConnection.onmessage = () => {
                    this.getData();
                }

                this.orderConnection.onclose = () => {
                    this.orderConnection = null;
                }
            }
        }
    },


}
</script>

<style scoped>

</style>

