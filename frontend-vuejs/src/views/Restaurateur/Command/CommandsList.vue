<template>
    <div id="commands">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <incoming-orders ref="incoming"/>
            </v-tab-item>
            <v-tab-item>
                <orders-in-preparation v-on:ready="getOrdersInPreparation()" ref="preparation"/>
            </v-tab-item>
            <v-tab-item>
                <orders-history v-on:ready="getOrdersHistory()" ref="history"/>
            </v-tab-item>
        </v-tabs>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import IncomingOrders from "../../../components/Restaurateur/IncomingOrders.vue";
import OrdersHistory from "../../../components/Restaurateur/OrdersHistory.vue";
import OrdersInPreparation from "../../../components/Restaurateur/OrdersInPreparation.vue";

@Component({
    components: {
        IncomingOrders,
        OrdersInPreparation,
        OrdersHistory
    }
})

export default class CommandsList extends Vue {
    tab = 0
    items = [
        {tab: "Commandes entrantes"},
        {tab: "Commandes en cours"},
        {tab: "Historique"},
    ]
    orders = null;
    incomingOrders = null;
    ordersInPreparation = null;
    ordersWithDeliveryman = null;
    ordersInWaiting = null;
    ordersFinished = null;

    $refs!: {
        incoming: IncomingOrders,
        preparation: OrdersInPreparation,
        history: OrdersHistory,
    }

    orderConnection: WebSocket | null = null;

    mounted () {
        this.getData()
        this.connectOrderWS();
    }

    beforeDestroy() {
        this.orderConnection?.close()
    }

    async getData() {
        let access_token = this.$cookies.get('token');
        await this.$axios.get(`orders`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
            .then(response => {
                this.orders = response.data.orders;
                this.incomingOrders = response.data.ordersToAcceptByRestaurant;
                this.ordersInPreparation = response.data.ordersToPrepare;
                this.ordersInWaiting = response.data.ordersToDeliver;
                this.ordersWithDeliveryman = response.data.ordersInDelivery;
                this.ordersFinished = response.data.ordersOver;
                this.$refs.incoming.getOrders(this.incomingOrders);
            });
    }

    getOrdersInPreparation() {
        this.$refs.preparation.getOrders(this.ordersInPreparation, this.ordersInWaiting);
    }

    getOrdersHistory() {
        this.$refs.history.getOrders(this.ordersWithDeliveryman, this.ordersFinished);
    }

    async connectOrderWS() {
        if (this.orderConnection === null) {
            this.orderConnection = new WebSocket("ws://localhost:3034/orders/socket/" + this.$cookies.get('role') + "/" + this.$cookies.get("user_id"))
        }

        this.orderConnection.onmessage = () => {
            this.getData()
        }

        this.orderConnection.onclose = () => {
            this.orderConnection = null
        }
    }
}



</script>

<style scoped>
@media screen and (min-width: 960px) {
    .info-menu {
        margin-top: 5px;
    }
}
</style>