<template>
    <div id="orders-in-preparation" class="side-padding">
        <h2 class="mt-3">Commandes en préparation</h2>
        <div v-for="order in this.orders" :key="order._id">
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
                        Réaliser pour {{ HoursFormater(order.CheckTime.Accepted_at, true) }}
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
        <div v-for="(order, indexOrder) in this.orders" :key="indexOrder">
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
                        Prête à {{ HoursFormater(order.CheckTime.Ready_at) }}
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


</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})

export default class OrdersInPreparation extends Vue {
    name = "OrdersInPreparation"

    orders = [];

    mounted (){
        this.$axios.get(`orders`)
            .then(response => {
                this.orders = response.data.orders;
            })
    }
    /*getOrders(orders) {
        console.log(orders);
        this.orders = orders;
    }
*/
    HoursFormater (orderTime, accepted: boolean) {
        if(accepted){
            const minutesToAdd = 30;
            const newTime = new Date(orderTime)
            const ReadyTime = new Date(newTime.getTime() + minutesToAdd*60000);
            const hours =  new Date(ReadyTime).getHours();
            const minutes =  new Date(ReadyTime).getMinutes();
            if(minutes === 0){
                return hours + "h";
            }
            return hours + "h" + minutes;
        }else {
            const hours =  new Date(orderTime).getHours();
            const minutes =  new Date(orderTime).getMinutes();
            const time = hours + "h" + minutes
            return time
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
    margin-top: 5%;
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