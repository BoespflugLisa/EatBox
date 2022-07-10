<template>
    <div id="orders-in-preparation" class="side-padding">
        <h2 class="mt-3">Commandes en préparation</h2>
        <div v-if="this.ordersInPreparation.length > 0 ">
            <div v-for="order in this.ordersInPreparation" :key="order._id">
                <v-card v-if="order.State === 1" class="d-flex justify-space-between mt-2 mb-2">
                    <div>
                        <v-card-title>
                            N°{{ order.N_Order }}
                        </v-card-title>
                        <v-card-text>
                            <p class="font-16">
                                Réaliser pour {{ timeToBeReady(order.CheckTime.Accepted_at) }}
                            </p>
                            <p>
                                Total : {{ order.Detail.Price }}€
                            </p>
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
            <p> Aucune commande à préparer</p>
        </div>

        <h2 class="mt-3">En attente du livreur</h2>
        <div v-if="this.ordersInWaiting.length > 0">
            <div v-for="(order, indexOrder) in this.ordersInWaiting" :key="indexOrder">
                <v-card v-if="order.State === 2" class="d-flex justify-space-between mt-2 mb-2">
                    <div>
                        <v-card-title>
                            N°{{ order.N_Order }}
                        </v-card-title>
                        <v-card-text>
                            <p class="font-16">
                                Prête à {{ formatTime(order.CheckTime.Ready_at) }}
                            </p>
                            <p>
                                Total : {{ order.Detail.Price }}€
                            </p>
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
            <p> Aucune commande prête</p>
        </div>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import moment from "moment";

@Component({
    components: {}
})

export default class OrdersInPreparation extends Vue {
    name = "OrdersInPreparation"

    ordersInPreparation = [];
    ordersInWaiting = [];

    mounted() {
        this.$emit('ready');
    }

    getOrders(ordersToPrepare, ordersToDeliver) {
        this.ordersInPreparation = ordersToPrepare;
        this.ordersInWaiting = ordersToDeliver;
    }

    HoursFormater(order, orderTime) {
        if (order.State === 1) {
            const preparationTime = moment(orderTime).add(moment.duration(30, 'minutes'))
            return preparationTime.format('HH:mm');
        } else if (order.State === 2) {
            return moment(orderTime).format('HH:mm');
        }
    }

    formatTime(date) {
        return moment(date).format('HH:mm');
    }

    timeToBeReady(orderTime) {
        const additionalTime = moment(orderTime).add(moment.duration(30, 'minutes'))
        return additionalTime.format('HH:mm');
    }

    showDetails(order) {
        this.$router.push({name: 'commandeDetails', params: {id: order._id}});
    }
}

</script>

<style scoped>

</style>
