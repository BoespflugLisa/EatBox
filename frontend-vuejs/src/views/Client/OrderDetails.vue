<template>

    <div class="side-padding">
        <v-card
            class="mx-auto mt-3"
            max-width="470"
            outlined
        >
            <v-card-title>
                Etat de la commande
            </v-card-title>
            <v-list-item three-line>
                <v-list-item-content>

                    <div class="flex-wrap d-flex text-h5 mb-1">
                        {{ this.commandState }}
                    </div>
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="70"
                    color="grey">
                    <v-img
                        src="../../assets/img/sacrifice.gif">
                    </v-img>
                </v-list-item-avatar>
            </v-list-item>
        </v-card>


        <v-card
            class="mx-auto mt-3"
            max-width="470"
            outlined
        >
            <v-card-title>Contact</v-card-title>

            <v-card-text>
                <p class="mb-2 font-weight-bold">Adresse du restaurant : {{ this.restaurantAddress }}</p>
                <p class="mb-2 font-weight-bold">Adresse de livraison : {{ this.clientAddress }}</p>
            </v-card-text>

        </v-card>


        <div v-if="this.stateNumber === 4 && this.order.Rating !== null" class="align-center d-flex justify-center mt-5">
            <v-btn rounded color="secondary" large @click="rateRestaurant = true">
                Noter le restaurant ?
            </v-btn>
        </div>


        <v-dialog
            v-model="rateRestaurant"
            width="450"
            v-if="rateRestaurant"
        >
            <v-card>
                <v-card-title>
                    Note du restaurant
                </v-card-title>
                <v-card-text class="d-flex justify-center">
                    <div v-for="(star, index) in this.note" :key="star.number">
                        <v-btn
                            text
                            @click="notation(star, index)"
                            :color="star.state === true ? 'success' : 'error'"
                            >
                            <v-icon>
                                mdi-star
                            </v-icon>
                        </v-btn>
                    </div>
                </v-card-text>
                <div class="d-flex justify-center">
                    <p>{{ order.Rating ? order.Rating : 0 }} / 5</p>
                </div>

                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-space-around">
                    <v-btn
                        @click="rateRestaurant =false"
                        color="primary"
                        text
                    >
                        Retour
                    </v-btn>
                    <v-btn
                        @click="goToOrdersHistory()"
                        color="primary"
                        text
                    >
                        Valider
                    </v-btn>

                </v-card-actions>
            </v-card>

        </v-dialog>

    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';


@Component({
    components: {}
})

export default class OrderDetails extends Vue {

    order = {
        Rating: 0,
    }
    orderID = "";
    stateNumber = null;
    states = ['En attente de validation restaurant',
        'En préparation...', 'Le livreur prend en charge votre commande',
        'Le livreur arrive!', 'Livrée!!', "A la recherche d'un livreur", 'Commande refusée']
    commandState = "";
    clientID = ""
    clientAddress = ""
    restaurantAddress = "";
    rateRestaurant = false;

    note = [{number: 1, state: false},
        {number: 2, state: false},
        {number: 3, state: false},
        {number: 4, state: false},
        {number: 5, state: false}]


    created() {
        this.orderID = this.$route.params.id;
        console.log(this.orderID)
    }

    async mounted() {
        await this.$axios.get('orders/' + this.orderID).then(response => {
                this.order = response.data.order;
                this.stateNumber = response.data.order.State
                this.commandState = this.states[response.data.order.State]
                this.clientID = response.data.order.Client
                this.restaurantAddress = response.data.order.Restaurant.Address.Number + ' ' + response.data.order.Restaurant.Address.Street + ' , ' + response.data.order.Restaurant.Address.Town + ' , ' + response.data.order.Restaurant.Address.Code;
                this.$axios.get('clients/' + this.clientID).then(response => {
                    this.clientAddress = response.data.client.Address.Number + ' ' + response.data.client.Address.Street + ' , ' + response.data.client.Address.Town + ' , ' + response.data.client.Address.Code
                })
            }
        )
    }

    goToOrdersHistory() {
        this.$axios.put('orders/'+ this.orderID, {data: this.order}).then().finally(() => {
            this.$router.push('/historique_des_commandes')
        })
    }

    notation(star, index) {
        if (star.state === false) {
            this.order.Rating = star.number
            for(let i = 0; i<= index; i++){
                this.note[i].state = true;
            }
        }
        else {
            star.state = false
            this.order.Rating = 0;
            for(let i = 0; i<= index; i++){
                this.note[index-i].state =  false;
            }
        }
    }

}
</script>

<style scoped>

</style>