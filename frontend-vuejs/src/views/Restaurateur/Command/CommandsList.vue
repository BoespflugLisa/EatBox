<template>
    <div id="commands">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>
        <div class="side-padding">
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item.tab">
                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes entrantes'">
                        <h2>Commandes à valider</h2>
                        <div v-for="order in orders" :key="order.number">
                            <div class="d-flex" v-if="order.restaurant_checked === false">
                                <div class="command-tab border-tab">
                                    <p class="font-weight-bold">
                                        {{ order.number }}
                                    </p>
                                    <p>
                                        Total : {{ order.price }}€
                                    </p>
                                </div>
                                <div class="info-tab border-tab">
                                    <p class="text-center">
                                        {{ order.hour }}
                                    </p>
                                </div>
                                <div class="info-tab border-tab">
                                    <v-btn @click="showDetails(order)" rounded color="secondary">
                                        Détails
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 ml-3" v-if="item.tab ==='Commandes en cours'">
                        <h2>Commandes en préparation</h2>
                        <div v-for="order in orders" :key="order.ready">
                            <div class="d-flex" v-if="order.restaurant_checked === true && order.ready === false">
                                <div class="command-tab border-tab">
                                    <p class="font-weight-bold">
                                        {{ order.number }}
                                    </p>
                                    <p>
                                        Total : {{ order.price }}€
                                    </p>
                                </div>
                                <div class="info-tab border-tab">
                                    <p class="text-center">
                                        {{ order.hour }}
                                    </p>
                                </div>
                                <div class="info-tab border-tab">
                                    <v-btn @click="showDetails(order)" rounded color="secondary">
                                        Détails
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                        <h2 class="mt-3">En attente du livreur</h2>
                        <div v-for="order in orders" :key="order.price">
                            <div class="d-flex" v-if="order.ready === true && order.delivered === false">
                                <div class="command-tab border-tab">
                                    <p class="font-weight-bold">
                                        {{ order.number }}
                                    </p>
                                    <p>
                                        Total : {{ order.price }}€
                                    </p>
                                </div>
                                <div class="info-tab border-tab">
                                    <p class="text-center">
                                        {{ order.hour }}
                                    </p>
                                </div>
                                <div class="info-tab border-tab">
                                    <v-btn @click="showDetails(order)" rounded color="secondary">
                                        Détails
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 ml-3" v-if="item.tab ==='Historique'">
                        <h2>Historique des commandes</h2>
                        <div v-for="order in orders" :key="order.delivered">
                            <div class="d-flex border-tab align-content-space-between"
                                 v-if="order.delivered === true">
                                <div class="command-tab">
                                    <p class="font-weight-bold">
                                        {{ order.number }}
                                    </p>
                                    <p>
                                        Total : {{ order.price }}€
                                    </p>
                                </div>
                                <div class="info-tab">
                                    <v-btn @click="showDetails(order)" rounded color="secondary">
                                        Détails
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})

export default class CommandsList extends Vue {

    tab = 0
    items = [
        {tab: "Commandes entrantes"},
        {tab: "Commandes en cours"},
        {tab: "Historique"},
    ]
    orders = [
        {
            number: "N°7696TCH", price: "15", hour: "19h00", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
            client: "M. Laurent MOY",
            favori: true,
            Menus: [{
                boisson: "Coca-cola",
                burger: "French Burger; sauce maison, salade, steack haché",
                accompagnement: "Frite; taille XL, sauce ketchup",
            }],
            Articles: ["Muffin au chocolat"],
            info_plus: "Attention je suis alergique au gluten"
        },
        {
            number: "N°2568BOE", price: "12", hour: "18h45", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
        },
        {
            number: "N°2758BIG", price: "8", hour: "14h50", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
        },
        {
            number: "N°2852BOU", price: "20", hour: "12h10", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
        },
        {
            number: "N°7644TCH", price: "15", hour: "19h00",
            delivery_man_validate: false,
            restaurant_checked: true,
            ready: true,
            delivered: false,
            client: "Mme. Anabelle HARIBO",
            favori: true,
            Menus: [{
                boisson: "Coca-cola",
                burger: "French Burger; sauce maison, salade, steack haché",
                accompagnement: "Frite; taille XL, sauce ketchup",
            }],
            Articles: ["Muffin au chocolat"],
            info_plus: "Attention je suis alergique au gluten"
        },
        {
            number: "N°2158BOE", price: "12", hour: "18h45", delivery_man_validate: false,
            restaurant_checked: true,
            ready: false,
            delivered: false,
            client: "Mme. Florence GOLDBEARS",
            favori: true,
            Menus: [{
                boisson: "Coca-cola",
                burger: "French Burger; sauce maison, salade, steack haché",
                accompagnement: "Frite; taille XL, sauce ketchup",
            }],
            Articles: ["Muffin au chocolat"],
            info_plus: "Attention je suis alergique au gluten"
        },
        {
            number: "N°2008BIG", price: "8", hour: "14h50", delivery_man_validate: false,
            restaurant_checked: true,
            ready: false,
            delivered: false
        },

        {
            number: "N°7894BIG", price: "24", hour: "21h50", delivery_man_validate: true,
            restaurant_checked: true,
            ready: true,
            delivered: true
        },
        {
            number: "N°5274TCH", price: "24", hour: "21h50", delivery_man_validate: true,
            restaurant_checked: true,
            ready: true,
            delivered: true,
            client: "M. Paul MARIE",
            favori: true,
            Menus: [{
                boisson: "Coca-cola",
                burger: "French Burger; sauce maison, salade, steack haché",
                accompagnement: "Frite; taille XL, sauce ketchup",
            }],
            Articles: ["Muffin au chocolat"],
            info_plus: "Attention je suis alergique au gluten"
        },
        {
            number: "N°0152BOU", price: "20", hour: "12h10",
            delivery_man_validate: false, restaurant_checked: true,
            ready: true,
            delivered: false,
            /*state : [
                {
                    delivery_man_validate: false,
                    restaurant_checked: true,
                    ready: true,
                    delivered: false,
                }
            ]*/
        },
    ]

    showDetails(order) {
        this.$router.push({name: 'commandeDetails', params: {id: order.number}});
    }
}


</script>

<style scoped>
@media screen and (min-width: 960px) {
    .info-menu {
        margin-top: 5px;
    }
}

.border-tab {
    margin-top: 5%;
    border: 1px solid black;
}

.command-tab {
    padding: 2% 15% 2% 2%;
    width: 100%;
}

.info-tab {
    padding: 0% 3% 0% 3%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.order_details_modal {
    width: 100%;
    height: 60%;
}

</style>