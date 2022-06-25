<template>
    <div class="side-padding">

        <h2 class=" align-self text-center"> Restaurants près de chez vous</h2>

        <v-card

          class="ml-2 mt-5 ml-2 "

          v-for="(resto, index) in restaurant"
          v-bind:key=index
          :src=resto.CoverImg
          @click="resto.state=true"
        >
            <v-img
              rounded


              height="100px"
              :src=resto.CoverImg
            ></v-img>

            <VCardTitle>
                {{ resto.Name}}

            </VCardTitle>
            <VCardText>
                {{ resto.Type}}

            </VCardText>
            <div class="ma-2 align-self text-center">
                <p class="ma-auto align-content-center text-center">{{ resto.nom }}</p>
            </div>
        </v-card>

    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';


@Component({
    components: {},
})

export default class AccueilClient extends Vue {

    //restaurant = null

    restaurant: Array<string> = []
    isEditing=false



    async mounted() {
        await this.$axios.get(`/restaurants`)
          .then(response => {
              this.restaurant = response.data.restaurants;
              //response.data.restaurants.forEach(element => this.restaurant.push(element.Name));

          })

    }

}
</script>

<style scoped>

</style>