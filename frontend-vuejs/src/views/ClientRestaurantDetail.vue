<template>
    <div class="side-padding">


        <v-img
          :src=restaurantImage
          height="200px"
        ></v-img>

        <h1 class="mt-3"> {{ restaurantName }}</h1>
        <p>Frais de livraisons : {{ faisDeLivraison }} € </p>
        <p>{{ restaurantType }}</p>


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
          :src=menu.Image
          @click="AddToCard()"
        >
            <v-img
              rounded
              height="100px"
              :src=menu.Image
            ></v-img>

            <VCardTitle>
                {{ menu.Name }}

            </VCardTitle>
            <VCardText>
                {{ menu.Description }}

            </VCardText>

        </v-card>


        <h2 class="mt-10">

            <v-icon color="dark">
                mdi-food
            </v-icon>
            Articles
        </h2>


            <div

              class="ml-2 mt-5 ml-2 "
              v-for="(categorie) in categories"
              v-bind:key=categorie._id
            >
                <v-card

                  class="ml-2 mt-5 ml-2 "
                  v-for="(article) in articles"
                  v-bind:key=article._id
                  :src=article.ArticleImg
                  @click="AddToCard()"
                >
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

                </v-card>
            </div>

        </div>


</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})

export default class ClientRestaurantDetail extends Vue {

    restaurantName = ''
    restaurantType = ''
    restaurantImage = ''
    faisDeLivraison = 1.49
    menus = []
    restaurantID = ''
    articles = []
    categories = []

    async mounted() {
        await this.$axios.get(`restaurants/menus/` + this.restaurantID)
          .then(response => {
              this.restaurantType = response.data.menu[0].made_by.Type
              this.restaurantName = response.data.menu[0].made_by.Name
              this.restaurantImage =  response.data.menu[0].made_by.CoverImg
              this.menus = response.data.menu

          })

        await this.$axios.get(`restaurants/articles/` + this.restaurantID)
          .then(response => {

              this.articles = response.data.article
          })

        await this.$axios.get(`restaurants/categories/` + this.restaurantID)
          .then(response => {

              this.categories = response.data.categorie


          })

    }

    created() {
        this.restaurantID = this.$route.params.id;
    }

    AddToCard() {
        console.log("prout")
    }

}
</script>

<style scoped>

</style>