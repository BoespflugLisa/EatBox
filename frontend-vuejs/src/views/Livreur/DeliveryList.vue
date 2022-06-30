<template>
    <div id="incoming-orders" class="side-padding">
        <div v-if="deliveryman.Free">
            <open-to-work
                v-on:open-to-work="setDeliverymanOpen()"
                v-if="!deliveryman.Open_to_work"
            />
            <div v-if="deliveryman.Free && deliveryman.Open_to_work">

                <div class="d-flex justify-center pa-5">
                    <v-btn rounded color="primary" @click="setDeliverymanNotOpen()">
                        Arreter les livraisons
                    </v-btn>
                </div>

                <h2 class="mt-3">Commandes à valider</h2>
                <div v-if="orders.length === 0" class="center-elements">
                    <p class="center">
                        Aucune commande disponible pour le moment. Revenez plus tard.
                    </p>
                    <v-icon
                        x-large
                    >
                        mdi-shopping-search-outline
                    </v-icon>
                </div>
                <div class="mt-3" v-else v-for="(order) in this.orders" :key="order._id">
                    <v-card class="d-flex justify-space-between mt-2 mb-2">
                        <div>
                            <v-card-title>
                                N°{{ order.N_Order }}
                            </v-card-title>
                            <v-card-text>
                                <p class="font-16">{{ formatTime(order.CheckTime.Created_at) }}</p>
                                <p>
                                    Adresse client :
                                    {{
                                        order.Client.Address.Number + ' ' +
                                        order.Client.Address.Street + ' ' +
                                        order.Client.Address.Town + ' , ' +
                                        order.Client.Address.Code
                                    }}
                                </p>
                            </v-card-text>
                        </div>
                        <v-card-actions class="mr-3">
                            <v-btn @click="UpdateDialogue(order)" rounded color="secondary">
                                Accepter
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>

        <div v-else class="center-elements">
            <p class="center">
                Vous possédez déjà une commande. Veuillez finir votre livraison avant d'en choisir une nouvelle.
            </p>
            <v-icon
                x-large
            >
                mdi-shopping-search-outline
            </v-icon>
        </div>

        <v-dialog
            v-model="showDialog"
            width="300"
        >
            <v-card class="text-end">
                <v-card-title>
                    Accepter la course ?
                </v-card-title>
                <v-card-actions>
                    <v-btn

                        @click=" showDialog =false"
                        color="primary"
                        text
                    >
                        Retour
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                        @click="showDetails(clickedOrder)"
                        color="primary"
                        text
                    >
                        Accepter
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import OpenToWork from "../../components/Livreur/OpenToWork.vue";
import moment from "moment";

@Component({
    components: {
        OpenToWork
    }
})

export default class DeliveryList extends Vue {
    name = "DeliveryList"
    showDialog = false
    orders = [];
    dialogDelete: Array<boolean> = []

    deliverymanId = this.$cookies.get('user_id');
    deliveryman = {
        Open_to_work: false,
        Free: false,
    }

    clickedOrder = {}

    async mounted() {
        this.getDeliveryman()
        await this.$axios.get(`orders`)
            .then(response => {
                this.orders = response.data.ordersToAcceptByDeliveryman;
                this.orders.forEach(element => this.dialogDelete.push(false));
            })
    }

    formatTime(orderTime) {
        return moment(orderTime).format('HH:mm');

    }

    UpdateDialogue(order) {
        this.dialogDelete[order] = !this.dialogDelete[order]
        this.showDialog = true
        this.clickedOrder = order
    }


    showDetails(order) {
        order.State = 0;
        order.Deliveryman_token = this.deliverymanId;
        this.$axios.put(`orders/` + order._id, {data: order}).then(response => {
            response.data;
        })

        this.deliveryman.Free = false
        this.$axios.put('/deliverymans/' + this.deliverymanId, {data: this.deliveryman})
        this.$router.push({name: 'DeliveryDetail', params: {id: order._id}});
    }

    getDeliveryman() {
        this.$axios.get('/deliverymans/' + this.deliverymanId).then((response) => {
            this.deliveryman = response.data.deliveryman;
        })
    }

    setDeliverymanOpen() {
        this.deliveryman.Open_to_work = true
        this.$axios.put('/deliverymans/' + this.deliverymanId, {data: this.deliveryman})
    }

    setDeliverymanNotOpen() {
        this.deliveryman.Open_to_work = false
        this.$axios.put('/deliverymans/' + this.deliverymanId, {data: this.deliveryman})
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

.center-elements {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    display: grid;
    margin-top: 20%;
}

.center {
    text-align: center;
}
</style>



