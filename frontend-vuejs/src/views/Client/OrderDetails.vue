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
                        src="../../assets/img/sacrifice.gif">
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
                <p class="mb-2 font-weight-bold">Adresse du restaurant : {{ this.restaurantAddress }}</p>
                <p class="mb-2 font-weight-bold">Adresse de livraison : {{ this.clientAddress }}</p>
            </v-card-text>
        </v-card>

        <v-card
            class="mx-auto mt-3"
            max-width="470"
            outlined
        >
            <v-card-text>
                <div>
                    <v-row no-gutters>
                        <v-col v-if="menus.length"
                               cols="12"
                               sm="6"
                        >
                            <p class="font-16 font-weight-bold">Menus commandés</p>
                            <ul>
                                <li v-for="(menu, index) in menus" :key="index">
                                    {{ menu.Name }}
                                </li>
                            </ul>
                        </v-col>
                        <v-col v-if="articles.length"
                               cols="12"
                               sm="6"
                        >
                            <p class="font-16 font-weight-bold">Articles commandés</p>
                            <ul>
                                <li v-for="(article, index) in articles" :key="(index+1)*2">
                                    {{ article.Name }}
                                </li>
                            </ul>
                        </v-col>

                    </v-row>
                </div>
                <v-divider class="mt-2 mb-2"></v-divider>
                <div class="d-flex justify-space-between font-14 mt-3">
                    <p class="font-weight-bold">Prix total:</p>
                    <p>{{ parseFloat(this.order.Detail.Price).toFixed(2) }} €</p>
                </div>

            </v-card-text>
        </v-card>

        <div class="mt-5">
            <div class="align-center d-flex justify-center mt-5">
                <v-btn rounded color="secondary" width="250px" large @click="goToOrdersHistory()">
                    Historique des commandes
                </v-btn>
            </div>

            <div v-if="this.stateNumber === 5 || this.stateNumber === 0"
                 class="align-center d-flex justify-center mt-5">
                <v-btn rounded color="error" width="250px" large @click="orderToCancel = true">
                    Annuler la commande
                </v-btn>
            </div>

            <div v-if="this.stateNumber === 4 && this.order.Rating === null"
                 class="align-center d-flex justify-center mt-5">
                <v-btn rounded color="secondary" width="250px" large @click="rateRestaurant = true">
                    Noter le restaurant ?
                </v-btn>
            </div>
        </div>

        <v-dialog
            v-model="rateRestaurant"
            width="450"
            v-if="rateRestaurant"
        >
            <v-card>
                <v-card-title>
                    Note du restaurant
                </v-card-title>
                <v-card-text class="d-flex justify-center">
                    <v-rating
                        v-model="order.Rating"
                        background-color="green lighten-3"
                        color="green"
                        large
                    ></v-rating>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-space-around">
                    <v-btn
                        @click="rateRestaurant =false"
                        color="primary"
                        text
                    >
                        Retour
                    </v-btn>
                    <v-btn
                        @click="goToOrdersHistory()"
                        color="primary"
                        text
                    >
                        Valider
                    </v-btn>

                </v-card-actions>
            </v-card>

        </v-dialog>

        <v-dialog
            v-model="orderToCancel"
            width="450"
            v-if="orderToCancel"
        >
            <v-card>
                <v-card-title>
                    Vous souhaitez annuler votre commande ?
                </v-card-title>
                <v-card-text class="red--text">
                    Attention, si vous validez, cela est irréversible!
                    De plus votre paiement ne sera pas pris en compte.
                </v-card-text>
                <v-card-actions class="d-flex justify-space-around mt-2">
                    <v-btn
                        @click="orderToCancel =false"
                        color="primary"
                        text
                    >
                        Retour
                    </v-btn>
                    <v-btn
                        @click="cancelOrder()"
                        color="primary"
                        text
                    >
                        Valider
                    </v-btn>

                </v-card-actions>
            </v-card>

        </v-dialog>

    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';


@Component({
    components: {}
})

export default class OrderDetails extends Vue {

    order = {
        Rating: 0,
        State: -1,
        Payment: "",
        CheckTime: {
            Cancelled_at: 0,
        },
        Detail: {
            Menus: [],
            Articles: [],
            Price: 0,
        },
        Restaurant: {
            _id: ""
        },
        Deliveryman_token: "",
    }
    orderID = "";
    stateNumber = null;
    states = ['En attente de validation du restaurant',
        'En préparation...', 'Le livreur prend en charge votre commande',
        'Le livreur arrive !', 'Livrée!!', "A la recherche d'un livreur", 'Commande Annulée']
    commandState = "";
    client: any = {}
    clientAddress = ""
    restaurantAddress = "";
    rateRestaurant = false;
    orderToCancel = false;
    menusId = [];
    menus: any = [];
    articlesId = [];
    articles: any = [];

    orderConnection: WebSocket | null = null


    created() {
        this.$cookies.remove('menus')
        this.$cookies.remove('articles')
        this.$cookies.remove('restaurant_id')
        this.orderID = this.$route.params.id;
    }

    mounted() {
        this.getData();
        this.connectOrderWS()
    }

    async getData() {
        let access_token = this.$cookies.get('token');
        await this.$axios.get('orders/' + this.orderID, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(response => {
                this.order = response.data.order;
                this.articlesId = response.data.order.Detail.Articles;
                this.menusId = response.data.order.Detail.Menus;
                this.stateNumber = response.data.order.State;
                this.commandState = this.states[response.data.order.State];
                this.client = response.data.order.Client;

                this.menus = [];
                this.menusId.forEach(menu => {
                    this.$axios.get("/menus/" + menu, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        }
                    }).then(responseMenu => {
                        this.menus.push(responseMenu.data.menu)
                    })
                });

                this.articles = [];
                this.articlesId.forEach(article => {
                    this.$axios.get("/articles/" + article, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        }
                    }).then(response => {
                        this.articles.push(response.data.article)
                    })
                });

                this.$axios.get("/users/restaurants/" + response.data.order.Restaurant, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(responseRestaurant => {
                    this.restaurantAddress = responseRestaurant.data.restaurant.Address.Number + ' ' + responseRestaurant.data.restaurant.Address.Street + ' , ' + responseRestaurant.data.restaurant.Address.Town + ' , ' + responseRestaurant.data.restaurant.Address.Code;
                });

                this.$axios.get('/users/clients/' + this.client, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(responseClient => {
                    this.clientAddress = responseClient.data.client.Address.Number + ' ' + responseClient.data.client.Address.Street + ' , ' + responseClient.data.client.Address.Town + ' , ' + responseClient.data.client.Address.Code
                });
            }
        )
    }

    goToOrdersHistory() {
        let access_token = this.$cookies.get('token');
        this.rateRestaurant = false;
        this.orderToCancel = false;
        this.$axios.put('orders/' + this.orderID, {data: this.order}, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then().finally(() => {
            this.$router.push('/HistoriqueCommandes')
        })
    }

    cancelOrder() {
        this.order.State = 6;
        this.order.Payment = "Canceled";
        this.order.CheckTime.Cancelled_at = Date.now()
        let access_token = this.$cookies.get('token');
        this.$axios.post("/notifications/" + this.order.Restaurant, {
            data: {
                action: "CanceledOrder",
                Types: {
                    Command: true,
                    Delivery: false,
                }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(() => {
            this.$axios.post("/notifications/" + this.order.Deliveryman_token, {
                data: {
                    action: "CanceledOrder",
                    Types: {
                        Command: true,
                        Delivery: false,
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            });
        });

        this.goToOrdersHistory();
    }

    async connectOrderWS() {
        if (this.orderConnection === null) {
            this.orderConnection = await new WebSocket("ws://localhost:3034/orders/socket/" + this.$cookies.get('role') + "/" + this.$cookies.get("user_id"));

            this.orderConnection.onmessage = () => {
                this.getData()
            }

            this.orderConnection.onclose = () => {
                this.orderConnection = null;
            }
        }
    }


}
</script>

<style scoped>

</style>