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
              @click="AddToCartMenu(menu._id)"
            >
                <v-img
                  rounded
                  height="100px"
                  :src=menu.MenuImg
                ></v-img>

                <VCardTitle>
                    {{ menu.Name }}

                </VCardTitle>
                <VCardText>
                    {{ menu.Description }}

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
                  @click="AddToCartArticle(article._id)"

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
                        <VCardText>
                            {{ article.Description }}

                        </VCardText>
                    </div>
                    </div>


                </v-card>
            </div>
        </div>

        <div class="btn-cart">
            <v-btn
              large
              fab
              dark
              small
              color="primary"
              to="/Cart"
            >

                <v-icon>
                    mdi-basket

                </v-icon>

            </v-btn>
        </div>

        <div class="justify-center text-center mt-10" v-if=" articles.length == 0 &&  menus.length == 0 ">
            <h1> On dirait que {{ restaurantName }} n'as pas encore publié sa carte ! Reviens plus tard (っ˘ڡ˘ς) </h1>
        </div>
        <eatbox-snackbar ref="snack"/>
    </div>


</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import EatboxSnackbar from "../components/Snack/EatboxSnackbar.vue";


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
    CartArticle: Array<string> = []
    CartMenu: Array<string> = []
    newCategoryArray: Array<any> = []
    duplicatedCategoryArray: Array<any> = []

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
                  if(element.Category!=null){
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
                  }}
              });
              console.log(this.categories);
              this.newCategoryArray = [...new Set(this.categories)]
          })


    }


    $refs!: {
        snack: EatboxSnackbar,
    }


    toggleAndSnack() {
        this.active = !this.active
        if (this.active) {
            this.$refs.snack.openSnackbar("Ajouté au favoris", "success");
        } else {
            this.$refs.snack.openSnackbar("Retiré des favoris", "fail");
        }
    }

    created() {
        this.restaurantID = this.$route.params.id;
    }

    AddToCartMenu(_id) {

        this.CartMenu.push(_id)
        console.log(this.CartMenu)

    }

    AddToCartArticle(_id) {

        this.CartArticle.push(_id)
        console.log(this.CartArticle)

    }

    beforeDestroy() {

        this.$cookies.set("menu", [...new Set(this.CartMenu)])
        this.$cookies.set("Articles", [...new Set(this.CartArticle)])
        this.CartMenu = []
        this.CartArticle = []
        this.categories = [];
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