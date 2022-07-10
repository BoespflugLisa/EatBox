<template>
    <div id="orders-history" class="side-padding">
        <h2 class="mt-3">Historique des commandes</h2>
        <h3 class="mt-3">Commandes en cours de livraison</h3>
        <div v-if="this.ordersWithDeliveryman.length > 0">
            <div class="mt-3" v-for="order in this.ordersWithDeliveryman" :key="order._id">
                <v-card v-if="order.State === 3" class="d-flex justify-space-between mb-2">
                    <div>
                        <v-card-title>
                            N°{{ order.N_Order }}
                        </v-card-title>
                        <v-card-text class="font-14">
                            <p>Total : {{ order.Detail.Price }}€</p>
                        </v-card-text>
                    </div>
                    <v-card-actions class="mr-3">
                        <v-btn @click="showDetails(order)" rounded color="secondary">
                            Détails
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
        <div v-else class="mt-5">
            <p> Aucune commande en livraison</p>
        </div>

        <h3 class="mt-3">Commandes Livrées</h3>
        <div v-if="this.ordersFinished.length > 0">
            <div class="mt-3" v-for="order in this.ordersFinished" :key="order._id">
                <v-card v-if="order.State === 4" class="d-flex justify-space-between mb-2">
                    <div>
                        <v-card-title>
                            N°{{ order.N_Order }}
                        </v-card-title>
                        <v-card-text class="font-14">
                            <p>Total : {{ order.Detail.Price }}€</p>
                        </v-card-text>
                    </div>
                    <v-card-actions class="mr-3">
                        <v-btn @click="showDetails(order)" rounded color="secondary">
                            Détails
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
        <div v-else class="mt-5">
            <p> Aucune commande Terminée</p>
        </div>
    </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import moment from "moment";

@Component({
    components: {}
})

export default class OrdersHistory extends Vue {
    name = "OrdersHistory"

    ordersWithDeliveryman = [];
    ordersFinished = [];

    mounted() {
        this.$emit('ready');
    }

    getOrders(ordersInDelivery, ordersOver) {
        this.ordersWithDeliveryman = ordersInDelivery;
        this.ordersFinished = ordersOver;
    }

    showDetails(order) {
        this.$router.push({name: 'commandeDetails', params: {id: order._id}});
    }

    formatTime(date) {
        return moment(date).format('DD/MM/YYYY HH:mm');
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
    margin-top: 2%;
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

</style>