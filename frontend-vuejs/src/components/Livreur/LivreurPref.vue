<template>
    <div id="restaurant-pref">


        <h2>Mes préferences</h2>

        <v-checkbox
          color="primary"
          v-model="checkbox1"
          :label="`Recevoir des notifications sur les commandes`"
        ></v-checkbox>

        <v-checkbox
          color="primary"
          v-model="checkbox2"
          :label="`Recevoir des notifications sur l'avancée du restaurant`"
        ></v-checkbox>

        <v-checkbox
          color="primary"
          v-model="checkbox3"
          :label="`Recevoir des notifications sur les activitées`"
        ></v-checkbox>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {
    },
})

export default class LivreurPref extends Vue {
    checkbox1 = false
    checkbox2 = false
    checkbox3 = false
}
</script>

<style scoped>

</style>