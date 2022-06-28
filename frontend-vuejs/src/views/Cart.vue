<template>


    <div class="side-padding mt-5">

        <h2 class="mt-3">

            <v-icon color="dark">
                mdi-shopping
            </v-icon>
            Votre commande
        </h2>

        <v-card

          class="ml-2 mt-5 ml-2 "
          v-for="(article) in articles"
          v-bind:key=article
        >

            <VCardTitle>
                {{ menu.Name }}

            </VCardTitle>
            <VCardText>
                {{ menu.Description }}

            </VCardText>

        </v-card>


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

export default class Cart extends Vue {


    menus: Array<object> = []
    articles: Array<object> = []
    CartMenu: Array<string>= []
    CartArticle: Array<string>= []
    res: object[] | any = []

    async mounted() {

        this.CartMenu = this.$cookies.get("menu").split(',')

        this.CartArticle =this.$cookies.get("Articles").split(',')

        this.articles = await this.$axios.post('articles/', this.CartArticle).then(r => {
            return r.data.article
        })


        console.log(this.articles)


    }



}


</script>

<style scoped>

</style>