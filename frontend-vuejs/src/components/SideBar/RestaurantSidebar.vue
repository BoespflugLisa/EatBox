<template>
    <div id="restaurant-sidebar" class="d-flex justify-center flex-column pa-5 pt-2">
        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10"
            to="/MonRestaurant"
        >
            Mon restaurant
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5"
            to="/Carte"
        >
            Gestion de la carte
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5"
            to="/Commandes"
        >
            Gestion des commandes
        </v-btn>

        <v-btn
            color="tertiary black--text"
            class="pr-10 pl-10 mt-5" to="/Stats"
        >
            Statistiques avancées
        </v-btn>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class RestaurantSidebar extends Vue {
    name = "RestaurantSidebar.vue"

}
</script>

<style scoped>

</style>