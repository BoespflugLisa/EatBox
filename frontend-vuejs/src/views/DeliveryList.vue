<template>
    <div id="incoming-orders" class="side-padding">
        <h2 class="mt-3">Commandes à valider</h2>
        <div v-for="(order) in this.orders" :key="order._id">
            <div class="d-flex">
                <div class="command-tab border-tab">
                    <p class="font-weight-bold">
                        N°{{ order.N_Order }}
                    </p>

                    <p>
                        Adresse client :
                        {{
                            order.Client.Client_ID.Address.Number + ' ' + order.Client.Client_ID.Address.Street + ' ' + order.Client.Client_ID.Address.Town + ' , ' + order.Client.Client_ID.Address.Code
                        }}
                    </p>
                </div>
                <div class="info-tab border-tab">
                    <p class="text-center">
                        {{ HoursFormater(order.CheckTime.Created_at, false) }}
                    </p>
                </div>
                <div class="info-tab border-tab">
                    <v-btn @click="UpdateDialogue(order)" rounded color="secondary">
                        Accepter
                    </v-btn>
                </div>
            </div>


        </div>


        <v-dialog
          v-model="showDialog"
          width="300"

        >
            <v-card class="text-end">
                <v-card-title>
                    Accepter la course ?
                </v-card-title>

                <v-btn
                  @click="showDetails(clickedOrder)"
                  color="primary"
                  text
                >
                    Accepter
                </v-btn>
                <v-btn

                  @click=" showDialog =false"
                  color="primary"
                  text
                >
                    Retour
                </v-btn>


            </v-card>

        </v-dialog>

    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})

export default class DeliveryList extends Vue {
    name = "DeliveryList"
    showDialog = false
    orders = [];
    dialogDelete: Array<boolean> = []
    deliverymanId = this.$cookies.get('user_id');
    clickedOrder={}

    async mounted() {
        await this.$axios.get(`orders`)
          .then(response => {
              this.orders = response.data.ordersToAcceptByDeliveryman;
              this.orders.forEach(element => this.dialogDelete.push(false));
          })

    }

    HoursFormater(orderTime) {
        const hours = new Date(orderTime).getHours();
        const minutes = new Date(orderTime).getMinutes();
        const time = hours + "h" + minutes
        return time
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

        this.$router.push({name: 'DeliveryDetail', params: {id: order._id}});

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



