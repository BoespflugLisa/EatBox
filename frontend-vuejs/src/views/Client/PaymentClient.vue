<template>
    <div id="payment-client" class="side-padding">

        <div>
            <h2 class="mt-5">
                Ma commande
            </h2>
            <div class="large-screen">
                <v-btn
                    rounded
                    @click="$router.go(-1)"
                    color="primary"
                >
                    Retourner au panier
                </v-btn>
            </div>
            <div class="small-screen">
                <v-btn
                    rounded
                    @click="$router.go(-1)"
                    fab
                    color="primary"
                >
                    <v-icon>
                        mdi-basket-plus
                    </v-icon>
                </v-btn>
            </div>
        </div>


        <div class="mt-2">
            <v-card>
                <v-card-title>
                    Mes informations :
                </v-card-title>
                <v-card-text>
                    <p class="d-flex">
                        Prénom, Nom : {{ this.client.Firstname }} {{ this.client.Name }}
                    </p>
                    <p>
                        Adresse : {{ this.address }}
                    </p>
                    <p>
                        Numéro de téléphone : {{ this.client.Phone }}
                    </p>
                </v-card-text>

                <v-card-title>
                    Prix total de la commande :
                </v-card-title>
                <v-card-text>
                    Votre commande est d'un montant de {{ (Math.round(this.totalAmount * 100)) / 100 }} €
                </v-card-text>
            </v-card>

            <div>
                <validation-observer ref="obsComment">
                    <validation-provider name="commentaire" rules="max:255">
                        <v-text-field
                            v-model="comment"
                            label="Commentaire"
                        />
                    </validation-provider>
                </validation-observer>
            </div>
        </div>
        <div>
            <h2 class="mt-5">
                Paiement
            </h2>
            <payment-form :comment="this.comment" :price="this.totalAmount" ref="payment-form"/>
        </div>
    </div>

</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PaymentForm from "../../components/Client/PaymentForm.vue";

import {ValidationObserver, ValidationProvider} from "vee-validate";

@Component({
    components: {
        PaymentForm,
        ValidationObserver,
        ValidationProvider,
    }
})

export default class PaymentClient extends Vue {

    name = "PaymentClient"

    clientID = "";
    restaurantID = ""
    menusAdded = ""
    articlesAdded = ""
    client = {}
    totalAmount = 0;
    address = ""
    comment = null;

    $refs!: {
        obsComment,
    }


    async mounted() {
        this.clientID = this.$cookies.get('user_id');
        this.menusAdded = this.$cookies.get("menus");
        this.articlesAdded = this.$cookies.get("articles");
        this.restaurantID = this.$cookies.get("retaurant_id")

        if (this.menusAdded) {
            const menus = this.menusAdded.split(',');
            menus.forEach(menuId => {
                this.$axios.get('menus/' + menuId).then(response => {
                    this.totalAmount += response.data.menu.Price
                })
            })

        }
        if (this.articlesAdded) {
            const articles = this.articlesAdded.split(',');
            articles.forEach(articleId => {
                this.$axios.get('articles/' + articleId).then(response => {
                    this.totalAmount += response.data.article.Price
                })
            })

        }

        await this.$axios.get('clients/' + this.clientID).then(response => {
            this.client = response.data.client;
            this.address = response.data.client.Address.Number + ' ' + response.data.client.Address.Street + ' , '
                + response.data.client.Address.Town + ' , ' + response.data.client.Address.Code

        })
    }
}
</script>

<style scoped>


@media screen and (max-width: 960px) {

    .large-screen {
        display: none;
    }

    .small-screen {
        display: flex;
        justify-content: space-around;
    }
}

@media screen and (min-width: 960px) {

    .large-screen {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2%;
    }

    .small-screen {
        display: none;
    }
}
</style>