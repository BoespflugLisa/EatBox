<template>
    <div id="stats-history" class="mb-2">
        <h1 class="pt-7 pb-1">Mes statistiques</h1>
        <v-card color="tertiary" class="pa-2">
            <v-card-title>
                Historique
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Rechercher"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table

                :headers="headers"
                :items="items"
                :search="search"
            >
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        small
                        @click="showHistoryDetail(item)"
                    >
                        mdi-eye
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <div class="pt-7" v-if="displayHistory">
            <h2>{{ this.title }}</h2>
            <div class="d-flex flex-wrap justify-space-around mt-2">
                <div class="text-center pa-3">
                    <h3>Nombre de commande</h3>
                    <p class="font-40">{{ this.nbCommand }}</p>
                </div>
                <div class="text-center pa-3">
                    <h3>Note</h3>
                    <p class="font-40">{{ this.meanRating }}⭐</p>
                </div>
                <div class="text-center pa-3">
                    <h3>Recette</h3>
                    <p class="font-40">{{ this.recette }} €</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class StatsHistory extends Vue {

    search = '';

    headers = [
        {text: 'Historique', value: 'date', sortable: false},
        {text: 'Actions', value: 'actions', sortable: false}
    ];

    items = [
        {
            id: 1,
            date: 'Mai 2022',
            meanRating: 4.02,
            nbRate: 92,
            nbCommand: 140,
            recette: 1940,
        },
        {
            id: 2,
            date: 'Avril 2022',
            meanRating: 3.98,
            nbRate: 60,
            nbCommand: 128,
            recette: 1650,
        },
        {
            id: 3,
            date: 'Mars 2022',
            meanRating: 4.22,
            nbRate: 108,
            nbCommand: 164,
            recette: 2080,
        }
    ]

    displayHistory = false;
    title = '';
    meanRating = 0;
    nbRate = 0;
    nbCommand = 0;
    recette = 0;

    showHistoryDetail(item: any) {
        this.title = item.date;
        this.meanRating = item.meanRating;
        this.nbRate = item.nbRate;
        this.nbCommand = item.nbCommand;
        this.recette = item.recette;

        this.displayHistory = true;
    }
}
</script>

<style scoped>

</style>