<template>
    <div id="restaurant-infos">
        <h2 class="mt-3">
            Informations du restaurant
            <v-btn
                icon
                color="primary"
                v-if="!editInfo"
                @click="showEditInfo()"
            >
                <v-icon size="25">mdi-pencil</v-icon>
            </v-btn>
            <div v-else>
                <v-btn
                    icon
                    color="primary"
                    @click="updateInfos()"
                    :loading="loadingInfo"
                >
                    <v-icon size="25">mdi-check</v-icon>
                </v-btn>
                <v-btn
                    icon
                    color="primary"
                    @click="editInfo = !editInfo"
                >
                    <v-icon size="25">mdi-close</v-icon>
                </v-btn>
            </div>
        </h2>

        <validation-observer ref="obsInfo">
            <h3 class="mt-3 mb-3">Nom du restaurant</h3>
            <p v-if="!editInfo">{{ restaurantInfos.Name }}</p>
            <validation-provider v-else name="Nom du restaurant" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedRestaurantName"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>


            <h3 class="mt-3 mb-3">Adresse du restaurant</h3>
            <p v-if="!editInfo">{{
                    restaurantInfos.Address.Number + ' ' + restaurantInfos.Address.Street + ' - ' + restaurantInfos.Address.Code + ' ' + restaurantInfos.Address.Town
                }}</p>
            <div v-else>

                <validation-provider name="Numéro" rules="required" v-slot="{ errors, valid }">
                    <v-text-field
                        v-model="editedAddress.Number"
                        label="Numéro"
                        :error-messages="errors"
                        :success="valid"
                    />
                </validation-provider>

                <validation-provider name="Rue" rules="required" v-slot="{ errors, valid }">
                    <v-text-field
                        v-model="editedAddress.Street" label="Rue"
                        :error-messages="errors"
                        :success="valid"
                    />
                </validation-provider>

                <validation-provider name="Code postal" rules="required|numeric" v-slot="{ errors, valid }">
                    <v-text-field
                        type="number"
                        v-model="editedAddress.Code" label="Code postal"
                        :error-messages="errors"
                        :success="valid"
                    />
                </validation-provider>

                <validation-provider name="Ville" rules="required" v-slot="{ errors, valid }">
                    <v-text-field
                        v-model="editedAddress.Town" label="Ville"
                        :error-messages="errors"
                        :success="valid"
                    />
                </validation-provider>
            </div>
        </validation-observer>


        <h3 class="mt-3 mb-3">Type de nourriture proposé </h3>
        <p>{{ restaurantInfos.Type }}</p>

        <h3 class="mt-3 mb-3">Horaires</h3>
        <select-schedule ref="schedule" v-on:update-hours="updateHours"/>

        <v-divider class="mt-4 mb-4"/>

        <h2 class="mt-3 mb-3">
            Informations de contact
            <v-btn
                icon
                color="primary"
                v-if="!editContact"
                @click="showEditContact()"
            >
                <v-icon size="25">mdi-pencil</v-icon>
            </v-btn>
            <div v-else>
                <v-btn
                    icon
                    color="primary"
                    @click="updateContact()"
                    :loading="loadingContact"
                >
                    <v-icon size="25">mdi-check</v-icon>
                </v-btn>
                <v-btn
                    icon
                    color="primary"
                    @click="editContact = !editContact"
                >
                    <v-icon size="25">mdi-close</v-icon>
                </v-btn>
            </div>
        </h2>

        <validation-observer ref="obsContact">
            <h3 class="mt-3 mb-3">Numéro de téléphone</h3>
            <p v-if="!editContact">{{ restaurantInfos.Phone }}</p>
            <validation-provider name="Telephone" v-else rules="required|digits:10" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedPhone"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>


            <h3 class="mt-3 mb-3">Adresse mail</h3>
            <p v-if="!editContact">{{ restaurantInfos.Mail }}</p>
            <validation-provider name="Email" v-else rules="required|email" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedMail"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Numéro de SIRET</h3>
            <p v-if="!editContact">{{ restaurantInfos.Legal.SIRET }}</p>

            <validation-provider name="Numéro de SIRET" v-else rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedSiret"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>
        </validation-observer>


        <v-divider class="mt-4 mb-4"/>

        <h2 class="mt-3 mb-3">
            Informations banquaires
            <v-btn
                icon
                color="primary"
                v-if="!editBank"
                @click="showEditBank()"
            >
                <v-icon size="25">mdi-pencil</v-icon>
            </v-btn>
            <div v-else>
                <v-btn
                    icon
                    color="primary"
                    @click="updateBank()"
                    :loading="loadingBank"
                >
                    <v-icon size="25">mdi-check</v-icon>
                </v-btn>
                <v-btn
                    icon
                    color="primary"
                    @click="editBank = !editBank"
                >
                    <v-icon size="25">mdi-close</v-icon>
                </v-btn>
            </div>
        </h2>

        <validation-observer ref="obsBank">
            <h3 class="mt-3 mb-3">Nom du compte</h3>
            <p v-if="!editBank">{{ restaurantInfos.Legal.AccountName }}</p>
            <validation-provider v-else name="Nom de compte" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedAccountName"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Identifiant BIC</h3>
            <p v-if="!editBank">{{ restaurantInfos.Legal.BIC }}</p>
            <validation-provider v-else name="Identifiant BIC" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedBic"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Numéro IBAN</h3>
            <p v-if="!editBank">{{ restaurantInfos.Legal.IBAN }}</p>
            <validation-provider v-else name="Numéro IBAN" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedIban"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>
        </validation-observer>

        <v-snackbar color="success" v-model="snackbarSuccess">
            Mise à jour efféctué avec succées
            <template v-slot:action="{ attrs }">
                <v-btn
                    icon v-bind="attrs"
                    @click="snackbarSuccess = false"
                >
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </template>
        </v-snackbar>

        <v-snackbar color="error" v-model="snackbarError">
            Erreur lors de la mise à jour
            <template v-slot:action="{ attrs }">
                <v-btn
                    icon v-bind="attrs"
                    @click="snackbarError = false"
                >
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SelectSchedule from './SelectSchedule.vue'
import {ValidationObserver, ValidationProvider} from "vee-validate";
import axios from "axios";

@Component({
    components: {
        SelectSchedule,
        ValidationObserver,
        ValidationProvider,
    },
})

export default class RestaurantInfos extends Vue {
    $refs!: {
        schedule: SelectSchedule,
        obsInfo: InstanceType<typeof ValidationObserver>,
        obsContact: InstanceType<typeof ValidationObserver>,
        obsBank: InstanceType<typeof ValidationObserver>,
    }

    restaurantId = ""

    restaurantInfos = {
        Name: "",
        Phone: "",
        Mail: "",
        Address: {
            Number: 0,
            Street: "",
            Town: "",
            Code: 0,
        },
        hours: {},
        Legal: {
            SIRET: "",
            AccountName: "",
            IBAN: "",
            BIC: "",
        }
    }

    editInfo = false
    loadingInfo = false
    editedRestaurantName = ""
    editedAddress = {
        Number: 0,
        Street: "",
        Town: "",
        Code: 0
    }

    editContact = false
    loadingContact = false
    editedPhone = ""
    editedMail = ""
    editedSiret = ""

    editBank = false
    loadingBank = false
    editedAccountName = ""
    editedBic = ""
    editedIban = ""

    snackbarSuccess = false
    snackbarError = false

    /*mounted() {
        this.restaurantId = this.$store.state.User.id
    }*/

    getData(data, id) {
        this.restaurantId = id;
        this.restaurantInfos = data;
        this.$refs.schedule.getHours(data.hours);
    }

    showEditInfo() {
        this.editedRestaurantName = this.restaurantInfos.Name;
        this.editedAddress = JSON.parse(JSON.stringify(this.restaurantInfos.Address));
        this.editInfo = true;
    }

    showEditContact() {
        this.editedPhone = this.restaurantInfos.Phone;
        this.editedMail = this.restaurantInfos.Mail;
        this.editedSiret = this.restaurantInfos.Legal.SIRET;
        this.editContact = true;
    }

    showEditBank() {
        this.editedAccountName = this.restaurantInfos.Legal.AccountName;
        this.editedBic = this.restaurantInfos.Legal.BIC;
        this.editedIban = this.restaurantInfos.Legal.IBAN;
        this.editBank = true;
    }

    updateInfos() {
        this.$refs.obsInfo.validate().then(success => {
            if (success) {
                this.loadingInfo = true
                this.restaurantInfos.Name = this.editedRestaurantName
                this.restaurantInfos.Address = this.editedAddress
                this.updateRestaurant()
            }
        })
    }

    updateContact() {
        this.$refs.obsContact.validate().then(success => {
            if (success) {
                this.loadingContact = true
                this.restaurantInfos.Phone = this.editedPhone;
                this.restaurantInfos.Mail = this.editedMail;
                this.restaurantInfos.Legal.SIRET = this.editedSiret
                this.updateRestaurant()
            }
        })
    }

    updateBank() {
        this.$refs.obsBank.validate().then(success => {
            if (success) {
                this.loadingBank = true
                this.restaurantInfos.Legal.AccountName = this.editedAccountName;
                this.restaurantInfos.Legal.BIC = this.editedBic;
                this.restaurantInfos.Legal.IBAN = this.editedIban
                this.updateRestaurant()
            }
        })
    }

    updateHours(hours){
        this.restaurantInfos.hours = hours;
        this.updateRestaurant();
    }

    updateRestaurant() {
        this.$axios.put("restaurants/"+this.restaurantId, {data: this.restaurantInfos}).then(() => {
            this.snackbarSuccess = true
        }).catch((e) => {
            console.log(e)
            this.snackbarError = true;
        }).finally(() => {
            this.loadingInfo = false;
            this.loadingContact = false;
            this.loadingBank = false;
            this.editInfo = false;
            this.editContact = false;
            this.editBank = false;
        })
    }

}
</script>

<style scoped>

</style>