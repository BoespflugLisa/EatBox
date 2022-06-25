<template>
    <div class="side-padding">

        <v-card

          class="ml-2 mt-5 ml-2 "
          max-width="160px"
          v-for="(resto, index) in restaurant"
          v-bind:key=index
          v-bind:src=resto
          @click="resto.state=true"
        >
            <v-img
              rounded
              width="200px"
              height="100px"
              v-bind:src=resto.image
            ></v-img>


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

    restaurant=null

    async mounted() {
        await this.$axios.get(`/restaurants`)
          .then(response => {
              this.restaurant = response.data;
                console.log(this.restaurant )
          })

    }
}
</script>

<style scoped>

</style>