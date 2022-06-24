<template>

    <div id="restaurant-stats" class="side-padding mt-3">

        <h2>Commandes à valider</h2>
        <div v-for="order in orders" :key="order.number">
            <div class="d-flex" >
                <div class="command-tab border-tab">
                    <p class="font-weight-bold">
                        {{ order.number }}
                    </p>
                    <p>
                        Nom du client : {{ order.client }}
                    </p>
                    <p>
                        Adresse de livraison : {{ order.adresse }}
                    </p>
                </div>
                <div class="info-tab border-tab">
                    <p class="text-center">
                        {{ order.hour }}
                    </p>
                </div>
                <div class="info-tab border-tab">
                    <v-btn @click="dialogDelete=true" rounded color="secondary">
                        Détails
                    </v-btn>
                </div>
            </div>
        </div>





        <v-dialog
          v-model="dialogDelete"
          width="300"
          v-if="dialogDelete"
        >
            <v-card class="text-end">
                <v-card-title >
                    Accepter la course ?
                </v-card-title>

                <v-btn
                  to="/DeliveryDetail"
                  color="primary"
                  text
                >
                    Accepter
                </v-btn>
                <v-btn

                  @click=" dialogDelete =false"
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
    components: {},
})

export default class DeliveryList extends Vue {


    dialogDelete = false
    orders = [
        {
            number: "N°7696TCH", price: "15", hour: "19h00", delivery_man_validate: false,
            restaurant_checked: false,
            ready: false,
            delivered: false,
            client: "M. Laurent MOY",
            adresse: "24 Rue Iggy Azalea, 5400 Nancy",
            favori: true,
            Menus: [{
                boisson: "Coca-cola",
                burger: "French Burger; sauce maison, salade, steack haché",
                accompagnement: "Frite; taille XL, sauce ketchup",
            }],
            Articles: ["Muffin au chocolat"],
            info_plus: "Attention je suis alergique au gluten"
        },]


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

.order_details_modal {
    width: 100%;
    height: 60%;
}

</style>