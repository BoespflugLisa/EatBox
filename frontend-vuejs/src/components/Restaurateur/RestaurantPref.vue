<template>
    <div id="restaurant-pref" class="mb-2">
        <h2>Mes préferences</h2>
        <div class="ml-4">
            <v-checkbox
                color="primary"
                v-model="editedPreferences.NotificationCommand"
                :label="`Recevoir des notifications sur les commandes`"
            ></v-checkbox>

            <v-checkbox
                color="primary"
                v-model="editedPreferences.NotificationDeliveryman"
                :label="`Recevoir des notifications sur les livreurs`"
            ></v-checkbox>

            <v-checkbox
                color="primary"
                v-model="editedPreferences.NotificationActivities"
                :label="`Recevoir des notifications sur les activitées`"
            ></v-checkbox>
        </div>
        <div class="d-flex justify-center mt-3">
            <v-btn
                rounded
                color="secondary"
                @click="updatePreferences()"
                :loading="loading"
            >
                Valider mes préférences
            </v-btn>
        </div>

    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import axios from "axios";

@Component({
    components: {},
})

export default class RestaurantPref extends Vue {
    restaurantInfos = {
        Preferences: {
            NotificationActivities: false,
            NotificationCommand: false,
            NotificationDeliveryman: false,
        }
    }

    restaurantId = ""

    editedPreferences = {
        NotificationActivities: false,
        NotificationCommand: false,
        NotificationDeliveryman: false,
    }

    loading = false;

    mounted() {
        this.$emit('ready');
    }

    getPreferences(data, id) {
        this.restaurantInfos = data;
        this.restaurantId = id
        this.editedPreferences = JSON.parse(JSON.stringify(data.Preferences));
    }

    updatePreferences() {
        if (this.editedPreferences.NotificationActivities !== this.restaurantInfos.Preferences.NotificationCommand ||
            this.editedPreferences.NotificationCommand !== this.restaurantInfos.Preferences.NotificationCommand ||
            this.editedPreferences.NotificationDeliveryman !== this.restaurantInfos.Preferences.NotificationDeliveryman)
        {
            this.loading = true;
            this.restaurantInfos.Preferences = this.editedPreferences;
            this.$axios.put("restaurants/update/"+this.restaurantId, {data: this.restaurantInfos}).then(() => {
                //this.snackbarSuccess = true
                this.loading = false;
            }).catch(() => {
                //this.snackbarError = true;
            });
        }
    }

}
</script>

<style scoped>

</style>