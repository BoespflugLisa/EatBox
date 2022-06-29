<template>
    <div id="deliveryman-sidebar" class="d-flex justify-center flex-column pa-5 pt-2">
        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10"
            to="/MonProfil"
        >
            Mon profil
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5"
            @click="getCurrentOrder()"
            :loading="loadingCurrentOrder"
        >
            Commande en cours
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5"
            to="/DeliveryList"
        >
            Commandes disponibles
        </v-btn>



    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component({
    components: {
    },
})

export default class DeliverymanSidebar extends Vue {
    currentOrderId = "";
    loadingCurrentOrder = false;

    getCurrentOrder() {
        this.loadingCurrentOrder = true
        this.$axios.get('/orders/deliverymanCurrentOrder/' + this.$cookies.get('user_id')).then((response) => {
            if (response.status === 200) {
                this.currentOrderId = response.data.order._id;
                this.loadingCurrentOrder = false
                this.$router.push('/DeliveryDetail/' + this.currentOrderId)
            } else {
                this.$emit('no-order')
                this.loadingCurrentOrder = false;
            }
        });
    }
}
</script>

<style scoped>

</style>