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
import  dateFormat, { i18n } from "dateformat"

i18n.monthNames = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juill.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

@Component({
    components: {},
})

export default class StatsHistory extends Vue {

    search = '';

    headers = [
        {text: 'Historique', value: 'Date', sortable: false},
        {text: 'Actions', value: 'actions', sortable: false}
    ];

    items = []

    displayHistory = false;
    title = '';
    meanRating = 0;
    nbRate = 0;
    nbCommand = 0;
    recette = 0;


    async mounted(){
        let access_token = this.$cookies.get('token');
        await this.$axios.get('stats/history/'+this.$cookies.get('user_id'), {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
            .then (response => {
                response.data.stat.forEach(element => element.Date = dateFormat(new Date(element.Date), 'mmmm yyyy'))
                this.items = response.data.stat
            })
    }

    showHistoryDetail(item) {
        this.title = item.Date;
        this.meanRating = item.MeanNotes;
        this.nbRate = item.nbRate;
        this.nbCommand = item.NbOrders;
        this.recette = item.Benefit;

        this.displayHistory = true;
    }
}
</script>

<style scoped>

</style>