<template>
    <div id="stats-of-the-month">
        <h1 class="pt-7 pb-1">Mes statistiques</h1>
        <h3>Notes du restaurant</h3>
        <p class="text-center">{{ this.meanRating }}⭐ basé sur {{ this.nbRate }} notes</p>
        <horizontal-bar
            :labels="this.labelsRate"
            :background-color="this.backgroundColorRate"
            :border-color="this.borderColorRate"
            :data="this.dataRate"
        />

        <h3 class="mt-7">Vos plats et menus les plus célèbres</h3>
        <horizontal-bar
            :labels="this.labelsBestSale"
            :background-color="this.backgroundColorBestSale"
            :border-color="this.borderColorBestSale"
            :data="this.dataBestSale"
        />

        <div class="d-flex flex-row flex-wrap mt-7">
            <div class="w-50 text-center">
                <h3>Nombre de commande</h3>
                <p class="font-40">{{ this.nbCommand }}</p>
            </div>
            <div class="w-50 text-center">
                <h3>Recette</h3>
                <p class="font-40">{{ this.recette }} €</p>
            </div>
        </div>

        <h3 class="mt-7">Vous êtes le restaurant favori de</h3>
        <div class="d-flex flex-row flex-wrap justify-space-around mt-7 mb-2">
            <v-card
                width="45%"
                height="100%"
                color="tertiary"
                class="align-center"
            >
                <v-card-text class="text-center">
                        <p class="font-40 mt-3 mb-2">500</p>
                        <p>personnes !</p>

                </v-card-text>
            </v-card>
            <div class="w-45">
                <p class="font-40 text-center light-green--text">+ 10</p>
                <p class="text-center">depuis le début du mois</p>
            </div>
        </div>




    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HorizontalBar from "../charts/HorizontalBar.vue";

@Component({
    components: {
        HorizontalBar
    },
})

export default class StatsOfTheMonth extends Vue {
    nbRate = 0
    meanRating = 0
    rating = {
        '5': 44,
        '4': 24,
        '3': 17,
        '2': 11,
        '1': 1,
    }

    labelsRate = ['5⭐', '4⭐', '3⭐', '2⭐', '1⭐'];
    backgroundColorRate = [
        'rgba(24,255,5,0.5)',
        'rgba(109,255,99,0.5)',
        'rgba(255,193,0,0.5)',
        'rgba(255,97,0,0.5)',
        'rgba(255,0,0,0.5)',
    ];
    borderColorRate = [
        'rgb(24,255,5)',
        'rgb(109,255,99)',
        'rgb(255,193,0)',
        'rgb(255,97,0)',
        'rgb(255,0,0)',
    ];
    dataRate: Array<number> = [];

    labelsBestSale = ['French Burger', 'Le taco de Bruno', 'Menu gourmant', 'Coockies tout choco', 'Frites'];
    backgroundColorBestSale = [
        'rgb(179,58,58,0.5)',
    ];
    borderColorBestSale = [
        'rgb(179,58,58)',
    ];
    dataBestSale: Array<number> = [51, 43, 42, 20, 12];

    nbCommand = 140;
    recette = 1940;


    created() {
        this.nbRate = this.rating["1"] + this.rating["2"] + this.rating["3"] + this.rating["4"] + this.rating["5"];
        this.meanRating = (this.rating["1"] + this.rating["2"] * 2 + this.rating["3"] * 3 + this.rating["4"] * 4 + this.rating["5"] * 5) / this.nbRate;
        this.meanRating = Math.round(this.meanRating * 100) / 100;
        this.dataRate = [this.rating["5"], this.rating["4"], this.rating["3"], this.rating["2"], this.rating["1"]]
    }


}
</script>

<style scoped>

</style>