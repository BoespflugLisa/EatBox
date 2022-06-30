<template>
    <div id="orders-history" class="side-padding">
        <h2 class="mt-3">Historique des commandes</h2>

        <h3 class="mt-3">Ma commande en cours</h3>
        <div v-if="this.currentOrder !== null" class="mt-3">
            <v-card class="d-flex justify-space-between">
                <div>
                    <v-card-title>
                        {{ timeToBeReady(currentOrder.CheckTime.Created_at) }}
                    </v-card-title>
                    <v-card-text class="font-14">
                        <p>N°{{ currentOrder.N_Order }}</p>
                        <p>Total : {{ currentOrder.Detail.Price }}€</p>
                    </v-card-text>
                </div>
                <v-card-actions class="mr-3">
                    <v-btn @click="showDetails(currentOrder)" rounded color="secondary">
                        Détails
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div v-else class="d-flex justify-center">
            <p>Vous n'avez aucune commande en cours.</p>
        </div>
        <h3 class="mt-3">Mes commandes terminées</h3>
        <div class="mt-3" v-for="order in this.ordersFinished" :key="order._id">
            <v-card class="d-flex justify-space-between">
                <div>
                    <v-card-title>
                        {{ formatTime(order.CheckTime.Delivered_at) }}
                    </v-card-title>
                    <v-card-text class="font-14">
                        <p>N°{{ order.N_Order }}</p>
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

</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import moment from "moment";

@Component({
    components: {}
})

export default class ClientOrdersHistory extends Vue {

    ordersFinished: any = [];
    currentOrder: any = null;

    mounted() {
        const clientId = this.$cookies.get('user_id');
        this.$axios.get(`orders/`)
            .then(response => {
                const allFinishedOrders = response.data.ordersOver
                allFinishedOrders.find(orderF => {
                    if (orderF.Client._id === clientId) {
                        this.ordersFinished.push(orderF);
                    }
                })

            })
        this.$axios.get('orders/client/' + clientId).then(response => {
            this.currentOrder = response.data.currentOrder;
        })

    }

    formatTime(date) {
        return moment(date).format('DD/MM/YYYY HH:mm');
    }

    timeToBeReady(orderTime) {
        const additionalTime = moment(orderTime).add(moment.duration(50, 'minutes'))
        return additionalTime;
    }

    showDetails(order) {
        this.$router.push('/suivi_commande/' + order._id);
    }

}

</script>

<style scoped>

</style>