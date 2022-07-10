<template>
    <div id="CommandDetails" v-if="this.order">
        <div class="side-padding">
            <h2 class="mt-3" v-if="this.order.State === 0">Commande à valider</h2>
            <h2 class="mt-3" v-else-if="this.order.State === 1">Commande en préparation</h2>
            <h2 class="mt-3" v-else-if="this.order.State === 2">En attente du livreur</h2>
            <h2 class="mt-3" v-else-if="this.order.State === 3 || this.order.State === 4">Historique de la commande</h2>
            <v-card class="mt-3 pl-3 pb-3" color="dark--text">
                <v-card-title class="justify-space-between">
                    <p>
                        N°{{ this.order.N_Order }}
                    </p>
                    <v-btn @click="goBack()" icon>
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p>
                        {{ this.client.Firstname }}
                        {{ this.client.Name }}
                        <span v-if="this.order.Client.Favorite === true">⭐</span>
                    </p>
                    <p v-if="this.order.State === 1">Commande à réaliser pour :
                        {{ HoursFormater(order, this.order.CheckTime.Accepted_at) }}</p>
                    <p v-else-if="this.order.State === 2">Commande prête depuis :
                        {{ HoursFormater(order, this.order.CheckTime.Ready_at) }}</p>
                    <div>
                        <div class="d-flex justify-space-between mr-5">
                            <p class="font-weight-bold font-18">
                                Détails de la commande :
                            </p>
                        </div>

                        <div v-if="this.menus.length > 0">
                            <p class="font-weight-bold">
                                Menus
                            </p>
                            <ul v-for="(menu, indexMenu) in this.menus" :key="indexMenu">
                                <li>
                                    {{ menu.Name }}
                                </li>
                            </ul>
                        </div>

                        <div v-if="this.articles.length > 0">
                            <p class="font-weight-bold">
                                Articles
                            </p>
                            <ul v-for="(article, indexArticle) in this.articles" :key="indexArticle">
                                <li>
                                    {{ article.Name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-3">
                                <span class="font-18 font-weight-bold">
                                    Prix total :
                                </span>
                        <span>{{ this.order.Detail.Price }} €</span>
                        <div v-if="this.order.Complementary !== ''">
                            <v-divider class="ma-auto" width="50%"></v-divider>
                            <div class="mt-3 mb-3" v-if="this.order.Complementary !== null">
                                <p class="font-18 font-weight-bold">
                                    Informations complémentaires :
                                </p>
                                <p class="font-14 font-italic">
                                    {{ this.order.Complementary }}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div v-if="this.order.State === 0" class="d-flex flex-row justify-center">
                        <div class="large-screen">
                            <v-btn rounded color="secondary" @click="RefuseOrder()" class="ma-2"
                                   width="100px">
                                Refuser
                            </v-btn>
                            <v-btn rounded color="secondary" @click="validateOrder()" class="ma-2"
                                   width="100px">
                                Accepter
                            </v-btn>
                        </div>
                        <div class="small-screen">
                            <v-btn rounded color="secondary" @click="RefuseOrder()" class="ma-2"
                                   width="30%">
                                <v-icon>
                                    mdi-close
                                </v-icon>
                            </v-btn>
                            <v-btn rounded color="secondary" @click="validateOrder()" class="ma-2"
                                   width="30%">
                                <v-icon>
                                    mdi-check
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>

                    <div v-if="this.order.State === 1"
                         class="d-flex flex-row justify-center">
                        <div class="large-screen">
                            <v-btn rounded color="secondary" @click="goBack()" class="ma-2" width="100px">
                                Retour
                            </v-btn>
                            <v-btn rounded color="secondary" @click="orderIsReady(Date.now())" class="ma-2"
                                   width="100px">
                                Prêt!
                            </v-btn>
                        </div>
                        <div class="small-screen">
                            <v-btn rounded color="secondary" @click="goBack()" class="ma-2" width="30%">
                                <v-icon>
                                    mdi-keyboard-backspace
                                </v-icon>
                            </v-btn>
                            <v-btn rounded color="secondary" @click="orderIsReady(Date.now())" class="ma-2"
                                   width="30%">
                                <v-icon>
                                    mdi-basket-check
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="button-position" v-if="this.order.State === 2">
                            <p class="font-16">Le livreur est présent ?</p>
                            <p class="font-14 font-italic">Scannez son QrCode :</p>
                            <v-btn @click="scanQrCode()" class="ma-2">
                                <v-icon>
                                    mdi-qrcode-scan
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>

                    <v-dialog
                        v-model="checkDeliveryman"
                        width="500"
                        eager
                    >
                        <v-card>
                            <scan-restaurant ref="scan"/>
                        </v-card>

                    </v-dialog>


                    <div>
                        <div v-if="this.order.State === 4" class="d-flex flex-row justify-center">
                            <v-btn rounded color="secondary" @click="goBack()" class="ma-2"
                                   width="30%">
                                Retour
                            </v-btn>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>

    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import moment from "moment";
import ScanRestaurant from "../../../components/Restaurateur/ScanRestaurant.vue";


@Component({
    components: {
        ScanRestaurant,
    }
})

export default class CommandsDetails extends Vue {
    orderID = "";
    order: any = null
    clientId = "";
    client = {
        Firstname: ""
    };
    menusId = [];
    menus: any = [];
    articlesId = [];
    articles: any = [];
    checkDeliveryman = false;

    $refs!: {
        scan: ScanRestaurant,
    }

    created() {
        this.$cookies.remove('menus')
        this.$cookies.remove('articles')
        this.orderID = this.$route.params.id;
    }

    async mounted() {
        await this.$axios.get(`orders/` + this.orderID)
            .then(response => {
                this.order = response.data.order;
                this.menusId = response.data.order.Detail.Menus;
                this.articlesId = response.data.order.Detail.Articles;
                this.clientId = response.data.order.Client;

                this.menus = [];
                this.menusId.forEach(menu => {
                    this.$axios.get("/menus/" + menu).then(responseMenu => {
                        this.menus.push(responseMenu.data.menu)
                    })
                });

                this.articles = [];
                this.articlesId.forEach(article => {
                    this.$axios.get("/articles/" + article).then(responseArticle => {
                        this.articles.push(responseArticle.data.article)
                    })
                });

                this.$axios.get("/users/clients/" + this.clientId).then(response => {
                    this.client = response.data.client
                });
            })
    }

    updated() {
        if (!this.checkDeliveryman) {
            this.$refs.scan.pause();
        }
    }

    HoursFormater(order, orderTime) {
        if (order.State === 1) {
            const preparationTime = moment(orderTime).add(moment.duration(30, 'minutes'))
            return preparationTime.format('HH:mm');
        } else if (order.State === 2) {
            return moment(orderTime).format('HH:mm');
        }
    }

    RefuseOrder() {
        this.order.State = 5;
        this.$axios.put(`orders/` + this.order._id, {data: this.order}).then(response => {
            response.data;
        })

        this.$axios.post("/notifications/" + this.order.Client._id, {
            data: {
                action: "CanceledOrder",
                Types: {
                    Command: true,
                    Delivery: false,
                }
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
            });
        });

        this.goBack();
    }

    validateOrder() {
        this.order.State = 1;
        this.order.CheckTime.Accepted_at = new Date();
        this.$axios.put(`orders/` + this.order._id, {data: this.order}).then(response => {
            response.data;
        })

        this.$axios.post("/notifications/" + this.order.Client._id, {
            data: {
                action: "OrderAcceptedRestaurant",
                Types: {
                    Command: true,
                    Delivery: false,
                }
            }
        }).then(() => {
            this.$axios.post("/notifications/" + this.order.Deliveryman_token, {
                data: {
                    action: "OrderAcceptedRestaurantDelivery",
                    Types: {
                        Command: true,
                        Delivery: false,
                    }
                }
            });
        });
    }

    orderIsReady(readyDate) {
        this.order.State = 2;
        this.order.CheckTime.Ready_at = readyDate;
        this.$axios.put(`orders/` + this.order._id, {data: this.order}).then(response => {
            response.data;
        })

        this.$axios.post("/notifications/" + this.order.Client._id, {
            data: {
                action: "DeliverymanWillTakeOrder",
                Types: {
                    Command: false,
                    Delivery: true,
                }
            }
        }).then(() => {
            this.$axios.post("/notifications/" + this.order.Deliveryman_token, {
                data: {
                    action: "OrderReady",
                    Types: {
                        Command: true,
                        Delivery: false,
                    }
                }
            });
        });
    }

    scanQrCode() {
        this.checkDeliveryman = true;
        this.$refs.scan.getOrderToDeliver(this.order);
    }

    goBack() {
        this.$router.push('/commandes');
    }
}
</script>

<style scoped>

.button-position {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}


@media screen and (max-width: 960px) {

    .large-screen {
        display: none;
    }

    .small-screen {
        display: flex;
        justify-content: space-around;
    }
}

@media screen and (min-width: 960px) {

    .large-screen {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2%;
    }

    .small-screen {
        display: none;
    }
}
</style>