<template>
    <div id="orders-history" class="side-padding">
        <h2 class="mt-3">Historique des commandes</h2>

        <h3 class="mt-3">Mes commandes terminées</h3>
        <div v-if="ordersFinished.length > 0">
            <div v-for="order in this.ordersFinished" :key="order._id">
                <v-card class="d-flex justify-space-between" v-if="order.State === 4">
                    <div>
                        <v-card-title>
                            N°{{ order.N_Order }}
                        </v-card-title>
                        <v-card-text>
                            <ul v-for="(menu, index) in order.Detail.Menus" :key="index">
                                <li> {{menu.Name}}</li>
                            </ul>
                            <ul v-for="(article,index) in order.Detail.Articles" :key="index*2">
                                <li> {{article.Name}}</li>
                            </ul>
                            Total : {{ order.Detail.Price }}€
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

    </div>

</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})

export default class ClientOrdersHistory extends Vue {

    ordersFinished = null;

    mounted() {
        this.$axios.get(`orders`)
            .then(response => {
                this.ordersFinished = response.data.ordersOver;
            })


    }

    showDetails(order) {
        this.$router.push('/suivi_commande/'+ order._id);
    }

}

</script>

<style scoped>

</style>