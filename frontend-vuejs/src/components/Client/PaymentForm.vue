<template>
    <div id="payment-form" class="side-padding">

        <div class="ma-auto">
            <vue-c-card
                :number="cc.number"
                :holder="cc.holder"
                :exp="cc.exp"
                :cvc="cc.cvc"
                :is-typing-cvc="isTypingCvc"/>
        </div>


        <validation-observer ref="obsPayment">

            <validation-provider name="numéro de carte" rules="required|numeric|max:16|min:16"
                                 v-slot="{ errors, valid }">
                <v-text-field
                    v-model="cc.number"
                    label="Numéro de carte"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <validation-provider name="prénom/nom" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="cc.holder"
                    label="Prénom Nom"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>
            <validation-provider name="date d'expiration" rules="required|max:5|min:5" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="cc.exp"
                    label="Date d'expiration"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <validation-provider name="numéro cvc" rules="required|numeric|max:3|min:3" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="cc.cvc"
                    label="CVC"
                    @focus="isTypingCvc = true"
                    @blur="isTypingCvc = false"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>
        </validation-observer>
        <div class="d-flex justify-end">
            <v-btn
                rounded
                color="primary"
                @click="createOrder()"
            >
                Suivant
            </v-btn>
        </div>
    </div>

</template>

<script>
import {Component,Prop, Vue} from 'vue-property-decorator';
import VueCCard from 'vue-ccard';
import {ValidationObserver, ValidationProvider} from "vee-validate";


export default {
    components: {
        VueCCard,
        ValidationObserver,
        ValidationProvider,
    },
    props : ['comment', 'price'],
    data() {
        return {
            isTypingCvc: false,
            cc: {
                number: '',
                holder: '',
                exp: '',
                cvc: '',
            },

            client: {},
            clientName: '',
            order: {
                N_Order : null,
                State : 5,
                Payment : "",
                Rating : null,
                Restaurant : null,
                Client : null,
                Deliveryman_token : null,
                Complementary: null,
                Detail : {
                    Price : null,
                    Menus : [],
                    Articles : [],
                    Paid : false,
                },
                CheckTime : {
                    Created_at : Date.now(),
                },
            },

            restaurantID: '',
            menusAdded: '',
            articlesAdded: '',
            amount : null,
            tempMenu: {},
            tempArticle: {},

        }
    },

    async mounted() {
        this.menusAdded = this.$cookies.get("menus");
        this.articlesAdded = this.$cookies.get("articles");
        this.restaurantID = this.$cookies.get("retaurant_id")

        if (this.menusAdded) {
            const menus = this.menusAdded.split(',');
            let access_token = this.$cookies.get('token');
            menus.forEach(menuId => {
                this.$axios.get('menus/' + menuId, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(response => {
                    this.order.Detail.Menus.push(response.data.menu);
                })
            })
        }
        if (this.articlesAdded) {
            const articles = this.articlesAdded.split(',');
            let access_token = this.$cookies.get('token');
            articles.forEach(articleId => {
                this.$axios.get('articles/' + articleId, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(response => {
                    this.order.Detail.Articles.push(response.data.article);
                })
            })
        }
        this.order.Client = this.$cookies.get('user_id')
        let access_token = this.$cookies.get('token');
        this.$axios.get('/users/clients/' + this.order.Client, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(response => {
            this.clientName = response.data.client.Lastname
            this.order.N_Order = this.getRandomNOrder(1000, 9999).toString().concat(this.clientName.substring(0, 3).toUpperCase());
        })

    },

    methods: {

        getRandomNOrder(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },

        createOrder() {
            this.$refs.obsPayment.validate().then(success => {
                if (success) {
                    this.order.State = 5;
                    this.order.Payment = "CB";
                    this.order.Rating = null;
                    this.order.Restaurant = this.restaurantID;
                    this.order.Deliveryman_token = "";
                    this.order.Detail.Paid = false;
                    this.order.Detail.Price = this.price;
                    this.order.Complementary = this.comment;
                    let access_token = this.$cookies.get('token');
                    this.$axios.post("/orders/" + this.restaurantID, {
                        data: this.order
                    }, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        }
                    }).then(response => {
                        this.$router.push('/SuiviCommande/' + response.data.order._id);
                    })

                }



            })
        },
    },
}

</script>

<style scoped>

</style>