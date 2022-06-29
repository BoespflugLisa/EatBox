<template>
    <div class="side-padding mt-5">

        <v-item-group
        >
            <v-item
                v-model="active">
                <v-img

                    :src=restaurantImage
                    height="200px"
                    class="text-right pa-2 rounded"
                >
                    <v-btn
                        icon
                        dark
                        @click="toggleAndSnack()"
                    >
                        <v-icon>
                            {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                        </v-icon>

                    </v-btn>

                </v-img>

            </v-item>
        </v-item-group>

        <h1 class="mt-3"> {{ restaurantName }}</h1>
        <p>Frais de livraisons : {{ faisDeLivraison }} € </p>
        <p>{{ restaurantType }}</p>

        <div v-if=" menus.length !== 0 ">
            <h2 class="mt-3">

                <v-icon color="dark">
                    mdi-food
                </v-icon>
                Menus
            </h2>


            <v-card

                class="ml-2 mt-5 ml-2 "
                v-for="(menu) in menus"
                v-bind:key=menu._id
                :src=menu.MenuImg
            >
                <v-item-group
                >
                    <v-item
                        v-model="active">
                        <v-img
                            rounded
                            height="100px"
                            :src=menu.MenuImg
                            class="text-right pa-2 rounded"
                        />
                    </v-item>
                </v-item-group>

                <VCardTitle>
                    {{ menu.Name }}

                </VCardTitle>
                <VCardText class="d-flex justify-space-between">
                    {{ menu.Description }}

                    <v-btn
                        fab
                        color="primary"
                        rounded
                        @click="AddToCartMenu(menu._id)"
                    >
                        <v-icon>
                            mdi-basket-plus
                        </v-icon>
                    </v-btn>
                </VCardText>

            </v-card>
        </div>
        <div v-if=" articles.length !== 0 ">
            <h2 class="mt-10">

                <v-icon color="dark">
                    mdi-food
                </v-icon>
                Articles
            </h2>

            <div
                class="ml-2 mt-5 ml-2 "
                v-for="(categorie) in this.categories"
                v-bind:key=categorie._id
            >
                <p class="mt-10 font-20">
                    {{ categorie.name }}
                </p>

                <v-card

                    class="ml-2 mt-5 ml-2 "
                    v-for="(article) in articles"
                    v-bind:key=article._id
                    :src=article.ArticleImg

                >
                    <div v-if="!!article.Category">
                        <div v-if="article.Category._id === categorie.id">
                            <v-img
                                rounded
                                height="100px"
                                :src=article.ArticleImg
                            ></v-img>

                            <VCardTitle>
                                {{ article.Name }}

                            </VCardTitle>
                            <VCardText class=" d-flex justify-space-between">
                                {{ article.Description }}
                                <v-btn
                                    fab
                                    color="primary"
                                    rounded
                                    @click="AddToCartArticle(article._id)"
                                >
                                    <v-icon>
                                        mdi-basket-plus
                                    </v-icon>
                                </v-btn>
                            </VCardText>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>

        <div class="btn-cart">
            <v-badge
                :content="countItems"
                :value="countItems"
                color="green"
                overlap
                bottom
            >
                <v-btn
                    large
                    fab
                    dark
                    small
                    color="primary"
                    @click="goToBasketPage()"
                >
                    <v-icon>
                        mdi-basket
                    </v-icon>

                </v-btn>
            </v-badge>

        </div>

        <div class="justify-center text-center mt-10" v-if=" articles.length == 0 &&  menus.length == 0 ">
            <h1> On dirait que {{ restaurantName }} n'as pas encore publié sa carte ! Reviens plus tard (っ˘ڡ˘ς) </h1>
        </div>
        <eatbox-snackbar ref="snack"/>
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

export default class ClientRestaurantDetail extends Vue {

    restaurantName = ''
    restaurantType = ''
    restaurantImage = ''
    faisDeLivraison = 1.49
    menus = []
    restaurantID = ''
    articles = []
    categories: Array<object> = [{
        Name: "",
    }]
    active = false
    countItems = 0;

    CartArticles: Array<string> = []
    CartMenus: Array<string> = []
    newCategoryArray: Array<any> = []

    async mounted() {
        await this.$axios.get(`restaurants/menus/` + this.restaurantID)
            .then(response => {
                this.menus = response.data.menu

            })

        await this.$axios.get(`restaurants/` + this.restaurantID)
            .then(response => {
                this.restaurantType = response.data.restaurant.Type
                this.restaurantName = response.data.restaurant.Name
                this.restaurantImage = response.data.restaurant.CoverImg

            })

        await this.$axios.get(`restaurants/articles/` + this.restaurantID)
            .then(response => {

                this.articles = response.data.article

                response.data.article.forEach(element => {
                    let boolAdd = true;
                    if (element.Category != null) {
                        this.categories.forEach(categorie => {

                            if (categorie["id"] === element.Category._id) {
                                boolAdd = false;
                            }
                        });

                        if (boolAdd) {
                            this.categories.push({
                                name: element.Category.Name,
                                id: element.Category._id
                            })
                        }
                    }
                });
                this.newCategoryArray = [...new Set(this.categories)]
            })

        if (this.$cookies.get('menus') != undefined){
           this.CartMenus = this.CartMenus.concat(this.$cookies.get('menus').split(','))
        }
        if (this.$cookies.get('articles') != undefined){
            this.CartArticles = this.CartArticles.concat(this.$cookies.get('articles').split(','))
        }

        this.countItems = this.CartMenus.length + this.CartArticles.length;

    }


    $refs!: {
        snack: EatboxSnackbar,
    }


    toggleAndSnack() {
        this.active = !this.active
        if (this.active) {
            this.$refs.snack.openSnackbar("Ajouté au favoris", "success");
        } else {
            this.$refs.snack.openSnackbar("Retiré des favoris", "error");
        }
    }

    created() {
        this.restaurantID = this.$route.params.id;
    }

    AddToCartMenu(_id) {
        this.CartMenus.push(_id)
        this.countItems++;
        this.$refs.snack.openSnackbar("Menu ajouté au panier", "success");
    }

    AddToCartArticle(_id) {
        this.CartArticles.push(_id)
        this.countItems++;
        this.$refs.snack.openSnackbar("Article ajouté au panier", "success");
    }

    goToBasketPage() {
        this.$cookies.set("menus", this.CartMenus)
        this.$cookies.set("articles", this.CartArticles)
        this.$router.push({name: 'Cart', params: {id: this.restaurantID}})
    }

    beforeDestroy() {
        this.CartMenus = []
        this.CartArticles = []
        this.categories = [];
        this.countItems = 0;
    }


}
</script>

<style scoped>

.btn-cart {
    position: fixed;
    bottom: 30px;
    right: 30px;

}
</style>