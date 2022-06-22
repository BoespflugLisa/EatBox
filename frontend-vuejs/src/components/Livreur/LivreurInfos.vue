<template>
    <div id="restaurant-infos">

        <div class="mt-3 ml-3">
            <h2>Informations personnelles

                <v-btn
                  icon
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="editName = !editName"
                >
                    <v-icon v-if="!editName" size="25">mdi-pencil</v-icon>
                    <v-icon v-else size="25">mdi-check</v-icon>
                </v-btn>
            </h2>
        </div>


        <div class="mt-3 ml-3">
            <h3>Nom</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editName">{{ name }}</h7>
            <v-text-field v-else v-model="name"></v-text-field>

        </div>

        <div class="mt-3 ml-3">
            <h3>Prénom</h3>
        </div>

        <div class="mt-3 ml-5">
            <h7 v-if="!editName">{{ prenom }}</h7>
            <v-text-field v-else v-model="prenom"></v-text-field>
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
            <h7 v-if="!editBank">{{ bankName }}</h7>
            <v-text-field v-else v-model="bankName"></v-text-field>
        </div>

        <div class="mt-3 ml-3">
            <h3>IBAN</h3>
        </div>

        <div class="mt-3 ml-5">
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
    name = "tets"
    prenom = "tets"
    telephone = "tets"
    mail = "tets"
    IBAN = "tets"
    bankName = "tets"


    editName = false
    editContact = false
    editBank = false
}
</script>

<style scoped>

</style>