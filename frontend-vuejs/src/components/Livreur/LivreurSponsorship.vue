<template>
    <div id="restaurant-sponsorship">
        <h2 class=" pt-7">Parrainer un Livreur</h2>
        <v-card

          class="mx-auto mt-5"
          max-width="400"
        >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

        </v-card>

        <p class="d-flex justify-center text-center mt-5">
            VOTRE CODE
        </p>
        <div class="d-flex justify-center">
            <v-btn color="secondary" class="mt-7" @click="  expand =true" rounded>
                {{ RandomNumParrainage }}
            </v-btn>
        </div>

        <p class="d-flex justify-center text-center mt-5">
            Partagez votre code avec d'autres livreurs. Lorsqu'ils l'utilisent vous bénéficiez de...
        </p>

        <v-expand-transition>
            <v-alert dismissible @click="expand =false" v-show="expand"
                     class="mt-5" type="success">
                Copier avec succès.
            </v-alert>
        </v-expand-transition>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class LivreurSponsorship extends Vue {
    RandomNumParrainage = "EatBox-9KJI9u"
    expand = false
}
</script>

<style scoped>

</style>