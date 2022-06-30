<template>
    <div id="incoming-orders" class="side-padding">
        <h2 class="mt-3">Commandes à valider</h2>
        <div  v-if="this.orders.length > 0">
            <div class="mt-3" v-for="order in this.orders" :key="order._id">
                <v-card class="d-flex justify-space-between mt-2 mb-2">
                    <div>
                        <v-card-title>
                            N°{{ order.N_Order }}
                        </v-card-title>
                        <v-card-text>
                            <p class="font-16">{{ formatTime(order.CheckTime.Created_at) }}</p>
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
            <p> Aucune commande à valider</p>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import moment from 'moment'

@Component({
    components: {}
})

export default class IncomingOrders extends Vue {

    name = "IncomingOrders"

    orders = [];

    mounted() {
        this.$emit('ready');
    }

    getOrders(orders) {
        this.orders = orders;
    }

    formatTime(orderTime) {
        return moment(orderTime).format('HH:mm');
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