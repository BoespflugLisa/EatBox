<template>
    <div id="incoming-orders" class="side-padding">
            <h2 class="mt-3">Commandes à valider</h2>
            <div v-for="order in this.orders" :key="order._id">
                <div class="d-flex" v-if="order.State === 0">
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
                            {{ HoursFormater(order.CheckTime.Created_at, false) }}
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

export default class IncomingOrders extends Vue {
    name = "IncomingOrders"

    orders = [];

    mounted (){
        this.$axios.get(`orders`)
            .then(response => {
                this.orders = response.data.orders;
            })
    }
   /* getOrders(orders: Array<never>){
        this.orders = orders;
    }*/

    HoursFormater (orderTime) {
        const hours =  new Date(orderTime).getHours();
        const minutes =  new Date(orderTime).getMinutes();
        const time = hours + "h" + minutes
        return time
    }

    showDetails(order) {
        this.$router.push({name: 'commandeDetails', params: {id: order._id}});
    }

    //TODO : Le déplacement de l'order en fonction de son état ("A valider" à "En prép", "En prép" à "En Attente du livreur"

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