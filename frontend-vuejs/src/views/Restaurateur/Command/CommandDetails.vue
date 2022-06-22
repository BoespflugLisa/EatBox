<template>
    <div id="CommandDetails">
        <div class="side-padding">
            <h2 v-if="order.restaurant_checked === false">Commande à valider</h2>
            <h2 v-else-if="order.restaurant_checked === true && order.ready === false">Commande en préparation</h2>
            <h2 v-else-if="order.ready === true && order.delivered === false">En attente du livreur</h2>
            <h2 v-else-if="order.delivered === true">Historique de la commande</h2>
            <v-card class="mt-3 pl-3 pb-3">
                <v-card-title class="justify-space-between">
                    <p>
                        {{ order.number }}
                    </p>
                    <v-btn @click="goBack(order)" icon>
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p>
                        {{ order.client }}
                        <span v-if="order.favori === true">⭐</span>
                    </p>
                    <p>
                        Commande à réaliser pour {{ order.hour }}
                    </p>
                </v-card-text>
                <div>
                    <div class="d-flex justify-space-between mr-5">
                        <p class="font-weight-bold font-18">
                            Détails de la commande :
                        </p>
                    </div>

                    <div v-if="order.menus !== null">
                        <div v-for="menu in order.menus" :key="menu.title">
                            <p class="font-weight-bold">{{ menu.title }}</p>
                            <ul v-for="article in menu.articles" :key="article">
                                <li>
                                    {{ article.nom }} :
                                    <span v-if="article.options !== null">
                                        <span class="font-italic font-14"
                                              v-for="option in article.options"
                                              :key="option">
                                            {{ option }}
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div v-if="order.articles !== null">
                        <p class="font-weight-bold">
                            Articles
                        </p>
                        <ul v-for="article in order.articles" :key="article">
                            <li>
                                {{ article.nom }}
                                <ul v-if="article.options !== null">
                                    <li v-for="option in article.options" :key="option">
                                        {{ option }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3">
                    <span class="font-18 font-weight-bold">
                        Prix total :
                    </span>
                    <span>{{ order.price }} €</span>
                    <div v-if="order.info_plus !== ''">
                        <v-divider class="ma-auto" width="50%"></v-divider>
                        <div class="mt-3 mb-3">
                            <p class="font-18 font-weight-bold">
                                Informations complémentaires :
                            </p>
                            <p class="font-14 font-italic">
                                {{ order.info_plus }}
                            </p>
                        </div>
                    </div>

                </div>

                <div v-if="order.restaurant_checked === false" class="d-flex flex-row justify-center">
                    <v-btn rounded color="secondary" to="/commandes" @click="cancelOrder(order)" class="ma-2"
                           width="30%">
                        Refuser
                    </v-btn>
                    <v-btn rounded color="secondary" to="/commandes" @click="validateOrder(order)" class="ma-2"
                           width="30%">
                        Accepter
                    </v-btn>
                </div>

                <div v-if="order.restaurant_checked === true && order.ready === false"
                     class="d-flex flex-row justify-center">
                    <v-btn rounded color="secondary" to="/commandes" @click="goBack(order)" class="ma-2" width="30%">
                        Retour
                    </v-btn>
                    <v-btn rounded color="secondary" to="/commandes" @click="orderIsReady(order)" class="ma-2"
                           width="30%">
                        Prêt!
                    </v-btn>
                </div>
                <div class="d-flex">
                    <div class="button-position" v-if="order.ready === true && order.delivered === false">
                        <p class="font-16">Le livreur est présent ?</p>
                        <p class="font-14 font-italic">Scannez son QrCode :</p>
                        <v-btn to="/commandes" @click="scanQrCode(order)" class="ma-2">
                            <v-icon>
                                mdi-qrcode-scan
                            </v-icon>
                        </v-btn>
                    </div>
                </div>



                <div>
                    <div v-if="order.delivered === true" class="d-flex flex-row justify-center">
                        <v-btn rounded color="secondary" to="/commandes" @click="goBack(order)" class="ma-2"
                               width="30%">
                            Retour
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </div>

    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver, ValidationProvider} from "vee-validate";

@Component({
    components: {}
})

export default class CommandsList extends Vue {
    orderID = "";
    order: unknown =
        {
            number: "", price: "", hour: "", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
            client: "",
            favori: false,
            menus: [{
                title: "",
                articles: [{
                    nom: "",
                    options: null
                }],
            }],
            articles: [{
                nom: "",
                options: null
            }],
            info_plus: ""
        }

    orders = [
        {
            number: "N°7696TCH", price: "15", hour: "19h00", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
            client: "M. Laurent MOY",
            favori: true,
            menus: [{
                title: "Menu 5",
                articles: [{
                    nom: "Coca-cola",
                    options: {taille: "33cl"}
                }, {
                    nom: "French burger",
                    options: {sauce: "sauce maison", taille: "XL"}
                }, {
                    nom: "Frites",
                    options: {sauce: "ketchup", taille: "XL"}
                }],
            }],
            articles: [{
                nom: "Muffin au chocolat",
                options: null
            }, {
                nom: "Cookie",
                options: null
            }],
            info_plus: "Attention je suis alergique au gluten"
        },
        {
            number: "N°2758BIG", price: "8", hour: "14h50", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
            client: "M. Jules Vernes",
            favori: false,
            menus: [{
                title: "Menu 5",
                articles: [{
                    nom: "Coca-cola",
                    options: {taille: "33cl"}
                }, {
                    nom: "French burger",
                    options: {sauce: "sauce maison", taille: "XL"}
                }, {
                    nom: "Frites",
                    options: {sauce: "ketchup", taille: "XL"}
                }],
            }],
            articles: [{
                nom: "Muffin au chocolat",
                options: null
            }, {
                nom: "Cookie",
                options: null
            }],
            info_plus: ""
        },
        {
            number: "N°2158BOE", price: "12", hour: "18h45", delivery_man_validate: false,
            restaurant_checked: true,
            ready: false,
            delivered: false,
            client: "Mme. Florence GOLDBEARS",
            favori: true,
            menus: [{
                title: "Menu 5",
                articles: [{
                    nom: "Coca-cola",
                    options: {taille: "33cl"}
                }, {
                    nom: "French burger",
                    options: {sauce: "sauce maison", taille: "XL"}
                }, {
                    nom: "Frites",
                    options: {sauce: "ketchup", taille: "XL"}
                }],
            }],
            articles: [{
                nom: "Muffin au chocolat",
                options: null
            }, {
                nom: "Cookie",
                options: null
            }],
            info_plus: "Attention je suis alergique au gluten"
        },
        {
            number: "N°5274TCH", price: "24", hour: "21h50", delivery_man_validate: true,
            restaurant_checked: true,
            ready: true,
            delivered: true,
            client: "M. Paul MARIE",
            favori: true,
            menus: [{
                title: "Menu 5",
                articles: [{
                    nom: "Coca-cola",
                    options: {taille: "33cl"}
                }, {
                    nom: "French burger",
                    options: {sauce: "sauce maison", taille: "XL"}
                }, {
                    nom: "Frites",
                    options: {sauce: "ketchup", taille: "XL"}
                }],
            }],
            articles: [{
                nom: "Muffin au chocolat",
                options: null
            }, {
                nom: "Cookie",
                options: null
            }],
            info_plus: "Attention je suis alergique au gluten"
        },
        {
            number: "N°0152BOU", price: "20", hour: "12h10",
            delivery_man_validate: false, restaurant_checked: true,
            ready: true,
            delivered: false,
            client: "M. Paul MARIE",
            favori: true,
            menus: [{
                title: "Menu 5",
                articles: [{
                    nom: "Coca-cola",
                    options: {taille: "33cl"}
                }, {
                    nom: "French burger",
                    options: {sauce: "sauce maison", taille: "XL"}
                }, {
                    nom: "Frites",
                    options: {sauce: "ketchup", taille: "XL"}
                }],
            }],
            articles: [{
                nom: "Muffin au chocolat",
                options: null
            }, {
                nom: "Cookie",
                options: null
            }],
            info_plus: "Attention je suis alergique au gluten"
        },
    ]

    created() {
        this.orderID = this.$route.params.id;
        this.getOrder();
        console.log(this.order);
    }

    getOrder() {
        /*for (let i = 0; i <= this.orders.length; i++) {
            if (this.orderID === this.orders[i].number) {
                this.order = this.orders[i]
            }
        }*/
        this.order = this.orders.find(o => o.number === this.orderID);
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
</style>