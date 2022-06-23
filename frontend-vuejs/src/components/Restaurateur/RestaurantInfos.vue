<template>
    <div id="restaurant-infos">
        <h2 class="mt-3">
            Informations du restaurant
            <v-btn
                icon
                color="primary"
                @click="editResto = !editResto"
            >
                <v-icon v-if="!editResto" size="25">mdi-pencil</v-icon>
                <v-icon v-else size="25">mdi-check</v-icon>
            </v-btn>
        </h2>

        <h3 class="mt-3 mb-3">Nom du restaurant</h3>
        <p v-if="!editResto">{{ restaurantInfos.Name }}</p>
        <v-text-field v-else v-model="restaurantInfos.Name"></v-text-field>

        <h3 class="mt-3 mb-3">Adresse du restaurant</h3>
        <p v-if="!editResto">{{
                restaurantInfos.Address.Number + ' ' + restaurantInfos.Address.Street + ' - ' + restaurantInfos.Address.Code + ' ' + restaurantInfos.Address.Town
            }}</p>
        <v-text-field v-else v-model="restaurantAddress"></v-text-field>

        <h3 class="mt-3 mb-3">Type de nourriture proposé </h3>
        <p v-if="!editResto">{{ restaurantInfos.Type }}</p>
        <v-text-field v-else v-model="restaurantInfos.Type"></v-text-field>

        <h3 class="mt-3 mb-3">Horaires</h3>
        <select-schedule ref="schedule"/>

        <v-divider class="mt-4 mb-4"/>

        <h2 class="mt-3 mb-3">
            Informations de contact
            <v-btn
                icon
                color="primary"
                @click="editContact = !editContact"
            >
                <v-icon v-if="!editContact" size="25">mdi-pencil</v-icon>
                <v-icon v-else size="25">mdi-check</v-icon>
            </v-btn>
        </h2>

        <h3 class="mt-3 mb-3">Numéro de téléphone</h3>
        <p v-if="!editContact">{{ restaurantInfos.Phone }}</p>
        <v-text-field v-else v-model="restaurantInfos.Phone"></v-text-field>

        <h3 class="mt-3 mb-3">Adresse mail</h3>
        <p v-if="!editContact">{{ restaurantInfos.Mail }}</p>
        <v-text-field v-else v-model="restaurantInfos.Mail"></v-text-field>


        <h3 class="mt-3 mb-3">Numéro de SIRET</h3>
        <p v-if="!editContact">{{ restaurantInfos.Legal.SIRET }}</p>
        <v-text-field v-else v-model="restaurantInfos.Legal.SIRET"></v-text-field>

        <v-divider class="mt-4 mb-4"/>

        <h2 class="mt-3 mb-3">
            Informations banquaires
            <v-btn
                icon
                color="primary"
                @click="editBank = !editBank"
            >
                <v-icon v-if="!editBank" size="25">mdi-pencil</v-icon>
                <v-icon v-else size="25">mdi-check</v-icon>
            </v-btn>
        </h2>

        <h3 class="mt-3 mb-3">Nom du compte</h3>
        <p v-if="!editBank">{{ restaurantInfos.Legal.AccountName }}</p>
        <v-text-field v-else v-model="restaurantInfos.Legal.AccountName"></v-text-field>

        <h3 class="mt-3 mb-3">Identifiant BIC</h3>
        <p v-if="!editBank">{{ restaurantInfos.Legal.BIC }}</p>
        <v-text-field v-else v-model="restaurantInfos.Legal.BIC"></v-text-field>

        <h3 class="mt-3 mb-3">Numéro IBAN</h3>
        <p v-if="!editBank">{{ restaurantInfos.Legal.IBAN }}</p>
        <v-text-field v-else v-model="restaurantInfos.Legal.IBAN"></v-text-field>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SelectSchedule from './SelectSchedule.vue'

@Component({
    components: {
        SelectSchedule
    },
})


export default class RestaurantInfos extends Vue {

    restaurantInfos = {
        Address: {
            Number: 0,
        },
        Legal: {
            SIRET: ""
        }
    }

    editResto = false
    editContact = false
    editBank = false

    $refs!: {
        schedule: SelectSchedule,
    }

    getData(data) {
        this.restaurantInfos = data;
        this.$refs.schedule.getHours(data.hours)
    }

}
</script>

<style scoped>

</style>