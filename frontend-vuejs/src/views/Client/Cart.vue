<template>
    <div id="Cart" class="side-padding mt-5">
        <div >
            <h2 class="mt-3">
                Mon Panier
            </h2>
            <div class="large-screen">
                <v-btn
                    rounded
                    @click="$router.go(-1)"
                    color="primary"
                >
                    Ajouter au panier
                </v-btn>
                <v-btn
                    rounded
                    @click="goToPayment()"
                    color="primary"
                >
                    Passer au paiement
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
                <v-btn
                    rounded
                    @click="goToPayment()"
                    fab
                    color="primary"
                >
                    <v-icon>
                        mdi-credit-card-settings-outline
                    </v-icon>
                </v-btn>
            </div>

        </div>

        <div v-if="this.CartArticles.length || this.CartMenus.length ">
            <h3 class="mt-3">Mes Menus</h3>
            <div v-if="this.CartMenus.length" class="d-flex flex-wrap">
                <v-card
                    class="ml-2 mt-5 ml-2 small-menus"
                    max-width="200px"
                    v-for="(menu, index) in this.CartMenus"
                    v-bind:key=index
                    v-bind:src=menu
                >
                    <v-img
                        rounded
                        width="200px"
                        height="100px"
                        :src=menu.MenuImg
                        class="text-right pa-2 rounded"
                    >
                        <v-btn
                            @click="removeMenuFromBasket(index, menu)"
                            rounded
                            color="error"
                            small
                            fab>
                            <v-icon>
                                mdi-basket-minus
                            </v-icon>
                        </v-btn>
                    </v-img>
                    <v-card-text>
                        <div class="d-flex flex-wrap">
                            <p class="font-weight-bold">
                                {{ menu.Name }}
                                {{ menu.Price }}€
                            </p>
                        </div>
                        {{ menu.Description }}
                    </v-card-text>
                </v-card>
            </div>
            <div v-else>
                <p>
                    Vous n'avez pas choisi de menu.
                </p>

            </div>

            <h3 class="mt-3">Mes articles</h3>
            <div v-if="this.CartArticles.length" class="d-flex flex-wrap">
                <v-card
                    class="ml-2 mt-5 ml-2 small-articles"
                    max-width="200px"
                    v-for="(article, index) in this.CartArticles"
                    v-bind:key=index
                    v-bind:src=article
                >
                    <v-img
                        rounded
                        width="200px"
                        height="100px"
                        :src=article.ArticleImg
                        class="text-right pa-2 rounded"
                    >
                        <v-btn
                            @click="removeArticleFromBasket(index, article)"
                            rounded
                            color="error"
                            small
                            fab>
                            <v-icon>
                                mdi-basket-minus
                            </v-icon>
                        </v-btn>
                    </v-img>
                    <v-card-text >
                        <div class="d-flex flex-wrap">
                            <p class="font-weight-bold">
                                {{ article.Name }}
                                {{ article.Price }}€
                            </p>
                        </div>
                        {{ article.Description }}
                    </v-card-text>
                </v-card>
            </div>
            <div v-else>
                <p>
                    Vous n'avez pas choisi d'article.
                </p>

            </div>
        </div>
        <div v-else class="center-elements">
            <p class="center">
                Vous n'avez aucun menu ou article dans votre panier...
            </p>
            <v-icon
                x-large
            >
                mdi-shopping-search-outline
            </v-icon>
        </div>


    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import EatboxSnackbar from "../../components/Snack/EatboxSnackbar.vue";


@Component({
    components: {
        EatboxSnackbar,
    }
})

export default class Cart extends Vue {

    menusAdded = ""
    articlesAdded = ""

    CartMenus: Array<object> = []
    CartArticles: Array<object> = []
    MenusID: Array<object> = []
    ArticlesID: Array<object> = []
    restaurantID: Array<string> = []
    clientID = ""
    client = {}

    res: object[] | any = []

    tempArticle: any = {}
    tempMenu: any = {}


    update() {
        this.$cookies.set('menus', this.CartMenus)
        this.$cookies.set('articles', this.CartArticles)
    }

    async mounted() {

        this.menusAdded = this.$cookies.get("menus")
        this.articlesAdded = this.$cookies.get("articles")

        if (this.menusAdded) {
            const menus = this.menusAdded.split(',');
            menus.forEach(menuId => {
                this.$axios.get('menus/' + menuId).then(response => {
                    this.CartMenus.push(response.data.menu);
                })
            })
        }
        if (this.articlesAdded) {
            const articles = this.articlesAdded.split(',');
            articles.forEach(articleId => {
                this.$axios.get('articles/' + articleId).then(response => {
                    this.CartArticles.push(response.data.article);
                })
            })
        }
    }

    removeArticleFromBasket(index) {
        this.CartArticles.splice(index, 1)
        this.ArticlesID = [];
        this.CartArticles.forEach(article => {
            this.tempArticle = article;
            this.ArticlesID.push(this.tempArticle._id)
        })
        this.$cookies.set('articles', this.ArticlesID)
    }

    removeMenuFromBasket(index) {
        this.CartMenus.splice(index, 1)
        this.MenusID = [];
        this.CartMenus.forEach(menu => {
            this.tempMenu = menu;
            this.MenusID.push(this.tempMenu._id)
        })
        this.$cookies.set('menus', this.MenusID)
    }

    goToPayment() {
        this.$router.push('/payement')
    }


}


</script>

<style scoped>

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

@media screen and (max-width: 960px) {

    .large-screen{
        display: none;
    }
    .small-screen{
        display: flex;
        justify-content: space-around;
    }

    .small-articles, .small-menus {
        width: 160px;
    }

}

@media screen and (min-width: 960px) {

    .large-screen{
        display: flex;
        justify-content: space-around;
    }
    .small-screen{
        display: none;
    }
}




</style>