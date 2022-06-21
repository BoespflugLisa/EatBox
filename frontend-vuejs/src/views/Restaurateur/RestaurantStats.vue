<template>
    <div id="restaurant-stats" class="side-padding">
        <v-tabs fixed-tabs>
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
                <v-tab-item>
                    <stats-of-the-month/>
                </v-tab-item>
                <v-tab-item>
                    nblhgfjfgnlgnfkbgf
                </v-tab-item>
        </v-tabs>


    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import StatsOfTheMonth from "../../components/Restaurateur/StatsOfTheMonth.vue";

@Component({
    components: {
        StatsOfTheMonth
    },
})

export default class RestaurantStats extends Vue {
    items = [
        {tab: "Stats du mois"},
        {tab: "Historique"},
    ]
}
</script>

<style scoped>

</style>