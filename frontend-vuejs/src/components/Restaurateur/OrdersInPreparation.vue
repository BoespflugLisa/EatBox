<template>
    <div id="orders-in-preparation" class="side-padding">
        <h2 class="mt-3">Commandes en préparation</h2>
        <div v-if="this.ordersInPreparation.length > 0 ">
            <div v-for="order in this.ordersInPreparation" :key="order._id">
                <div class="d-flex" v-if="order.State === 1">
                    <div class="command-tab border-tab">
                        <p class="font-weight-bold">
                            N°{{ order.N_Order }}
                        </p>
                        <p>
                            Total : {{ order.Detail.Price }}€
                        </p>
                    </div>
                    <div class="info-tab border-tab">
                        <p class="text-center">
                            Réaliser pour {{ HoursFormater(order, order.CheckTime.Accepted_at) }}
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
        <div v-else class="mt-5">
            <p> Aucune commande à préparer</p>
        </div>

        <h2 class="mt-3">En attente du livreur</h2>
        <div v-if="this.ordersInWaiting.length > 0">
            <div v-for="(order, indexOrder) in this.ordersInWaiting" :key="indexOrder">
                <div class="d-flex" v-if="order.State === 2">
                    <div class="command-tab border-tab">
                        <p class="font-weight-bold">
                            N°{{ order.N_Order }}
                        </p>
                        <p>
                            Total : {{ order.Detail.Price }}€
                        </p>
                    </div>
                    <div class="info-tab border-tab">
                        <p class="text-center">
                            Prête à {{ HoursFormater(order, order.CheckTime.Ready_at) }}
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
        <div v-else class="mt-5">
            <p> Aucune commande Prête</p>
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
        if (order.State === 1){
            const preparationTime = moment(orderTime).add(moment.duration(30, 'minutes'))
            return preparationTime.format('HH:mm');
        }
        else if (order.State === 2){
            return moment(orderTime).format('HH:mm');
        }
    }

    showDetails(order) {
        this.$router.push({name: 'commandeDetails', params: {id: order._id}});
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
    padding: 2% 5% 2% 2%;
    width: 100%;
}

.info-tab {
    padding: 0% 3% 0% 3%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>