<template>
    <div id="restaurant-infos">

        <div class="mt-3 ml-3">
            <h2>Informations du restaurant

                <v-btn
                    icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="editResto = !editResto"
                >
                    <v-icon v-if="!editResto" size="25">mdi-pencil</v-icon>
                    <v-icon v-else size="25">mdi-check</v-icon>
                </v-btn>
            </h2>
        </div>


        <div class="mt-3 ml-3">
            <h3>Nom du restaurant</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editResto">{{ restaurantName }}</h7>
            <v-text-field v-else v-model="restaurantName"></v-text-field>

        </div>

        <div class="mt-3 ml-3">
            <h3>Type de nourriture proposé </h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editResto">{{ foodType }}</h7>
            <v-text-field v-else v-model="foodType"></v-text-field>
        </div>

        <div class="mt-3 ml-3">
            <h3>Horaires</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editResto">Lun. : {{ LunTime }}</h7>
            <div v-else>

            </div>
            <br>
            <h7 v-if="!editResto">Mar. : {{ MarTime }}</h7>
            <br>
            <h7 v-if="!editResto">Mer. : {{ MerTime }}</h7>
            <br>
            <h7 v-if="!editResto">Jeu. : {{ JeuTime }}</h7>
            <br>
            <h7 v-if="!editResto">Ven. : {{ VenTime }}</h7>
            <br>
            <h7 v-if="!editResto">Sam. : {{ SamTime }}</h7>
            <br>
            <h7 v-if="!editResto">Dim. : {{ DimTime }}</h7>
        </div>

        <div class="d-flex justify-center pt-5 pb-3 ">
            <v-btn block rounded color="secondary" large>
                Fermeture exceptionnelle
            </v-btn>

        </div>

        <v-banner
            v-model="v0"
            single-line
            transition="slide-y-transition"
        ></v-banner>

        <div class="mt-3 ml-3">
            <h2>Informations de contact

                <v-btn
                    icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="editContact = !editContact"
                >
                    <v-icon v-if="!editContact" size="25">mdi-pencil</v-icon>
                    <v-icon v-else size="25">mdi-check</v-icon>
                </v-btn>

            </h2>

        </div>

        <div class="mt-3 ml-3">
            <h3>Numéro de téléphone</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editContact">{{ telephone }}</h7>
            <v-text-field v-else v-model="telephone"></v-text-field>
        </div>

        <div class="mt-3 ml-3">
            <h3>Adresse mail</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editContact">{{ mail }}</h7>
            <v-text-field v-else v-model="mail"></v-text-field>
        </div>

        <div class="mt-3 ml-3">
            <h3>Numéro de SIRET</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editContact">{{ numSiret }}</h7>
            <v-text-field v-else v-model="numSiret"></v-text-field>
        </div>

        <v-banner
            v-model="v0"
            single-line
            transition="slide-y-transition"
        ></v-banner>

        <div class="mt-3 ml-3">
            <h2>Informations banquaires

                <v-btn
                    icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="editBank = !editBank"
                >
                    <v-icon v-if="!editBank" size="25">mdi-pencil</v-icon>
                    <v-icon v-else size="25">mdi-check</v-icon>
                </v-btn>
            </h2>
        </div>

        <div class="mt-3 ml-3">
            <h3>Nom du compte</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editBank">{{ telephone }}</h7>
            <v-text-field v-else v-model="telephone"></v-text-field>
        </div>

        <div class="mt-3 ml-3">
            <h3>Identifiant BIC</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editBank">{{ BIC }}</h7>
            <v-text-field v-else v-model="BIC"></v-text-field>
        </div>

        <div class="mt-3 ml-3">
            <h3>Numéro IBAN</h3>
        </div>

        <div class="mt-3 ml-5 mb-5">
            <h7 v-if="!editBank">{{ IBAN }}</h7>
            <v-text-field v-else v-model="IBAN"></v-text-field>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class RestaurantInfos extends Vue {
    restaurantName = "tets"
    foodType = "tets"
    telephone = "tets"
    mail = "tets"
    numSiret = "tets"
    BIC = "tets"
    IBAN = "tets"

    LunTime = "11h30-14h / 19h-23h30"
    MarTime = "11h30-14h / 19h-23h30"
    MerTime = "11h30-14h / 19h-23h30"
    JeuTime = "11h30-14h / 19h-23h30"
    VenTime = "11h30-14h / 19h-23h30"
    SamTime = "11h30-14h / 19h-23h30"
    DimTime = "Fermé."

    editResto = false
    editContact = false
    editBank = false
}
</script>

<style scoped>

</style>