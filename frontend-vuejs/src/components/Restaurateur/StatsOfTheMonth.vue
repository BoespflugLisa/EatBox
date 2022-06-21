<template>
    <div id="stats-of-the-month">
        <h1 class="pt-7 pb-1">Mes statistiques</h1>
        <h3>Notes du restaurant</h3>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
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

    created() {
        this.nbRate = this.rating["1"] + this.rating["2"] + this.rating["3"] + this.rating["4"] + this.rating["5"];
        this.meanRating = (this.rating["1"] + this.rating["2"] * 2 + this.rating["3"] * 3 + this.rating["4"] * 4 + this.rating["5"] * 5) / this.nbRate;
        this.meanRating = Math.round(this.meanRating * 100) / 100;
    }


}
</script>

<style scoped>

</style>