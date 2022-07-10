<template>
    <div class="client-sponsorship">
        <h2 class=" pt-7">Parrainer un ami !</h2>
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
            <v-btn color="secondary" class="mt-7" @click="buttonParrainage()" rounded>
                {{ RandomNumParrainage }}
            </v-btn>
        </div>

        <p class="d-flex justify-center text-center mt-5">
            Partagez votre code avec vos amis. Lorsqu'ils l'utilisent vous bénéficiez de 5€ de remise sur votre prochaine commande.
        </p>

        <v-expand-transition>
            <v-alert dismissible @click="expand =false" v-show="expand"
                     class="mt-5" type="success">
                Copier avec succès.
            </v-alert>
        </v-expand-transition>
    </div>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";

@Component({
    components: {},
})

export default class ClientSponsorship extends Vue {
    RandomNumParrainage = "EatBox-9KJI9u"
    expand = false


    buttonParrainage(){
        this.expand =true

        navigator.clipboard.writeText(this.RandomNumParrainage)
    }
}
</script>

<style scoped>

</style>