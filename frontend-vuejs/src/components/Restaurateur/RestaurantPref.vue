<template>
    <div id="restaurant-pref">
        <h2>Mes préferences</h2>
        <div class="ml-4">
            <v-checkbox
                color="primary"
                v-model="Preferences.NotificationCommand"
                :label="`Recevoir des notifications sur les commandes`"
            ></v-checkbox>

            <v-checkbox
                color="primary"
                v-model="Preferences.NotificationDeliveryman"
                :label="`Recevoir des notifications sur les livreurs`"
            ></v-checkbox>

            <v-checkbox
                color="primary"
                v-model="Preferences.NotificationActivities"
                :label="`Recevoir des notifications sur les activitées`"
            ></v-checkbox>
        </div>

    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class RestaurantPref extends Vue {
    Preferences = {
        NotificationActivities: false,
        NotificationCommand: false,
        NotificationDeliveryman: false,
    }

    mounted() {
        this.$emit('ready');
    }

    getPreferences(pref) {
        this.Preferences = pref;
    }
}
</script>

<style scoped>

</style>