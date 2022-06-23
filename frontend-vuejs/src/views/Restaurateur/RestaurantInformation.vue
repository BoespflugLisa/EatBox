<template>
    <div id="restaurant-information">

        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <div class="side-padding">
            <v-tabs-items v-model="tab">


                <v-tab-item v-for="item in items" :key="item.tab">

                    <div v-if="item.tab ==='Info'">

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
                            <v-text-field v-else v-model="numSiret"></v-text-field>
                        </div>

                        <div class="mt-3 ml-3">
                            <h3>Identifiant BIC</h3>
                        </div>

                        <div class="mt-3 ml-5">
                            <h7 v-if="!editBank">{{ mail }}</h7>
                            <v-text-field v-else v-model="numSiret"></v-text-field>
                        </div>

                        <div class="mt-3 ml-3">
                            <h3>Numéro IBAN</h3>
                        </div>

                        <div class="mt-3 ml-5 mb-5">
                            <h7 v-if="!editBank">{{ numSiret }}</h7>
                            <v-text-field v-else v-model="numSiret"></v-text-field>
                        </div>

                    </div>

                    <div class="ml-3 mt-3" v-if="item.tab ==='Préférences'">


                        <h2>Mes préferences</h2>

                        <v-checkbox
                            color="primary"
                            v-model="checkbox1"
                            :label="`Recevoir des notifications par e-mail`"
                        ></v-checkbox>

                        <v-checkbox
                            color="primary"
                            v-model="checkbox2"
                            :label="`Recevoir des notifications sur les commandes`"
                        ></v-checkbox>

                        <v-checkbox
                            color="primary"
                            v-model="checkbox3"
                            :label="`Recevoir des notifications sr les livreurs`"
                        ></v-checkbox>

                        <v-checkbox
                            color="primary"
                            v-model="checkbox4"
                            :label="`Recevoir des notifications sur les activitées`"
                        ></v-checkbox>

                        <v-checkbox
                            color="primary"
                            v-model="checkbox5"
                            :label="`Recevoir des notifications par e-mail`"
                        ></v-checkbox>

                        <v-checkbox
                            color="primary"
                            v-model="checkbox6"
                            :label="`Recevoir des notifications`"
                        ></v-checkbox>

                        <v-checkbox
                            color="primary"
                            v-model="checkbox7"
                            :label="`Recevoir des notifications`"
                        ></v-checkbox>
                    </div>

                    <div class="ma-3 " v-if="item.tab ==='Parrainage'">

                        <h2 class="d-flex justify-center pt-7">Parrainer un restaurant</h2>

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
                            Partagez votre code avec d'autres restaurants. Lorsqu'ils l'utilisent vous bénéficiez de...
                        </p>

                        <v-expand-transition>
                            <v-alert dismissible @click="expand =false" v-show="expand"
                                     class="mt-5" type="success">
                                Copier avec succès.
                            </v-alert>
                        </v-expand-transition>

                    </div>

                </v-tab-item>

            </v-tabs-items>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class RestaurantInformation extends Vue {

    name = "RestaurantInformation"

    tab = 0
    items = [
        {tab: "Info"},
        {tab: "Préférences"},
        {tab: "Parrainage"},
    ]
    restaurantName = "tets"
    foodType = "tets"
    telephone = "tets"
    mail = "tets"
    numSiret = "tets"

    LunTime = "11h30-14h / 19h-23h30"
    MarTime = "11h30-14h / 19h-23h30"
    MerTime = "11h30-14h / 19h-23h30"
    JeuTime = "11h30-14h / 19h-23h30"
    VenTime = "11h30-14h / 19h-23h30"
    SamTime = "11h30-14h / 19h-23h30"
    DimTime = "Fermé."

    RandomNumParrainage = "EatBox-9KJI9u"
    editResto = false
    editContact = false
    editBank = false
    expand = false
    checkbox1 = false
    checkbox2 = false
    checkbox3 = false
    checkbox4 = false
    checkbox5 = false
    checkbox6 = false
    checkbox7 = false


}
</script>

<style scoped>
@media screen and (min-width: 960px) {
    .info-menu {
        margin-top: 5px;
    }

    .info-card {
        display: flex;
        justify-content: center;
        align-items: center;

    }


}
</style>