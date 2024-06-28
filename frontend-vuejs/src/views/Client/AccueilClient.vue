<template>
    <div class="side-padding">

        <h2 class="align-self text-center mt-7"> Restaurants près de chez vous</h2>

        <v-card

          class="ml-2 mt-5 ml-2 "

          v-for="(resto, index) in restaurant"
          v-bind:key=index
          :src=resto.CoverImg
          @click="showRestoDetail(resto)"
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


    clickedResto={}
    restaurant: Array<string> = []




    async mounted() {
        let access_token = this.$cookies.get('token');
        await this.$axios.get(`/users/restaurants`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
          .then(response => {
              this.restaurant = response.data.restaurants;
              //response.data.restaurants.forEach(element => this.restaurant.push(element.Name));

          })

    }


    showRestoDetail(resto) {
        this.$router.push({name: 'ClientRestaurantDetail', params: {id: resto.id}});

    }

}
</script>

<style scoped>

</style>