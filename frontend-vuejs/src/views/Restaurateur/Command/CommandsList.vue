<template>
    <div id="commands">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <incoming-orders ref="incoming"/>
            </v-tab-item>
            <v-tab-item>
                <orders-in-preparation ref="preparation"/>
            </v-tab-item>
            <v-tab-item>
                <orders-history ref="history"/>
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

    /*$refs!: {
        incoming: IncomingOrders,
        preparation: OrdersInPreparation,
        history: OrdersHistory,
    }*/



    /*getOrdersData() {
        this.$axios.get(`orders`)
            .then(response => {
                console.log(response.data.orders);
            })
    }
*/

}



</script>

<style scoped>
@media screen and (min-width: 960px) {
    .info-menu {
        margin-top: 5px;
    }
}
</style>