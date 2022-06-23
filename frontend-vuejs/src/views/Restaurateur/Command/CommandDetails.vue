<template>
    <div id="CommandDetails" v-if="this.order">
        <div class="side-padding">
            <h2 class="mt-3" v-if="this.order.State === 0">Commande à valider</h2>
            <h2 class="mt-3" v-else-if="this.order.State === 1">Commande en préparation</h2>
            <h2 class="mt-3" v-else-if="this.order.State === 2">En attente du livreur</h2>
            <h2 class="mt-3" v-else-if="this.order.State === 3 || this.order.State === 4">Historique de la commande</h2>
            <v-card class="mt-3 pl-3 pb-3" color="dark--text">
                <v-card-title class="justify-space-between">
                    <p>
                        N°{{ this.order.N_Order }}
                    </p>
                    <v-btn @click="goBack()" icon>
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p>
                        {{ this.client.Firstname }}
                        {{ this.client.Name }}
                        <span v-if="this.order.Client.Favorite === true">⭐</span>
                    </p>
                    <p v-if="this.order.State === 1">Commande à réaliser pour : {{ HoursFormater(this.order.CheckTime.Accepted_at, true) }}</p>
                    <p v-else-if="this.order.State === 2">Commande prête depuis : {{ HoursFormater(this.order.CheckTime.Ready_at, false) }}</p>
                <div>
                    <div class="d-flex justify-space-between mr-5">
                        <p class="font-weight-bold font-18">
                            Détails de la commande :
                        </p>
                    </div>

                    <div v-if="this.menus !== null">
                        <p class="font-weight-bold">
                            Menus
                        </p>
                        <ul v-for="(menu, indexMenu) in this.menus" :key="indexMenu">
                            <li>
                                {{ menu.Name }}
                            </li>
                        </ul>
                    </div>

                    <div v-if="this.articles !== null">
                        <p class="font-weight-bold">
                            Articles
                        </p>
                        <ul v-for="(article, indexArticle) in this.articles" :key="indexArticle">
                            <li>
                                {{ article.Name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3">
                                <span class="font-18 font-weight-bold">
                                    Prix total :
                                </span>
                    <span>{{ this.order.Detail.Price }} €</span>
                    <div v-if="this.order.Complementary !== ''">
                        <v-divider class="ma-auto" width="50%"></v-divider>
                        <div class="mt-3 mb-3">
                            <p class="font-18 font-weight-bold">
                                Informations complémentaires :
                            </p>
                            <p class="font-14 font-italic">
                                {{ this.order.Complementary }}
                            </p>
                        </div>
                    </div>

                </div>

                <div v-if="this.order.State === 0" class="d-flex flex-row justify-center">
                    <v-btn rounded color="secondary" to="/commandes" @click="cancelOrder(this.order)" class="ma-2"
                           width="30%">
                        Refuser
                    </v-btn>
                    <v-btn rounded color="secondary" to="/commandes" @click="validateOrder(this.order)" class="ma-2"
                           width="30%">
                        Accepter
                    </v-btn>
                </div>

                <div v-if="this.order.State === 1"
                     class="d-flex flex-row justify-center">
                    <v-btn rounded color="secondary" to="/commandes" @click="goBack(this.order)" class="ma-2" width="30%">
                        Retour
                    </v-btn>
                    <v-btn rounded color="secondary" to="/commandes" @click="orderIsReady(this.order , Date.now())" class="ma-2"
                           width="30%">
                        Prêt!
                    </v-btn>
                </div>
                <div class="d-flex">
                    <div class="button-position" v-if="this.order.State === 2">
                        <p class="font-16">Le livreur est présent ?</p>
                        <p class="font-14 font-italic">Scannez son QrCode :</p>
                        <v-btn to="/commandes" @click="scanQrCode(this.order)" class="ma-2">
                            <v-icon>
                                mdi-qrcode-scan
                            </v-icon>
                        </v-btn>
                    </div>
                </div>


                <div>
                    <div v-if="this.order.State === 4" class="d-flex flex-row justify-center">
                        <v-btn rounded color="secondary" to="/commandes" @click="goBack(this.order)" class="ma-2"
                               width="30%">
                            Retour
                        </v-btn>
                    </div>
                </div>
                </v-card-text>
            </v-card>
        </div>

    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})

export default class CommandsDetails extends Vue {
    orderID = "";
    order = null;
    client = null;
    menus: Array<any> = [];
    articles = [];

    created() {
        this.orderID = this.$route.params.id;
    }

    mounted() {
        this.$axios.get(`orders/` + this.orderID)
            .then(response => {
                this.order = response.data.order;
                this.menus = response.data.order.Detail.Menus;
                this.articles = response.data.order.Detail.Articles;
                this.client = response.data.order.Client.Client_ID;
            })
    }

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

    validateOrder(order) {
        order = this.order
        order.State = 1;
        this.$axios.put(`orders/` + order._id).then(response => {
            console.log(response.data)
        })
    }

    goBack() {
        this.$router.push('/commandes');
    }
}
</script>

<style scoped>

.button-position {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
</style>