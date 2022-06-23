<template>
    <div id="orders-history" class="side-padding">
        <h2 class="mt-3">Historique des commandes</h2>
        <div v-for="order in this.orders" :key="order._id">
            <div class="d-flex border-tab align-content-space-between"
                 v-if="order.State === 3">
                <div class="command-tab">
                    <p class="font-weight-bold">
                        N°{{ order.N_Order }}
                    </p>
                    <p>
                        Total : {{ order.Detail.Price }}€
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
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})

export default class OrdersHistory extends Vue {
    name = "OrdersHistory"

    orders = [];

    mounted (){
        this.$axios.get(`orders`)
            .then(response => {
                this.orders = response.data.orders;
            })
    }
    /*getOrders(orders: Array<never>){
        this.orders = orders;
    }*/

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

</style>