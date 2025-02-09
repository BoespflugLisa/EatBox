<template>
    <div id="restaurant-infos">
        <div class="d-flex mt-3 justify-space-between">
            <h2>Image du restaurant</h2>
            <v-btn
                icon class="ml-3"
                color="primary"
                v-if="!editImg"
                @click="showEditImg()"
            >
                <v-icon size="25">mdi-pencil</v-icon>
            </v-btn>
            <div v-else class="ml-3">
                <v-btn
                    icon
                    color="primary"
                    @click="updateImg()"
                    :loading="loadingImg"
                >
                    <v-icon size="25">mdi-check</v-icon>
                </v-btn>
                <v-btn
                    icon
                    color="primary"
                    @click="editImg = !editImg"
                >
                    <v-icon size="25">mdi-close</v-icon>
                </v-btn>
            </div>
        </div>


        <div class="mt-3 img-container" v-if="!editImg">
            <v-img height="200px" width="100%" :src="this.restaurantInfos.CoverImg" class="rounded-lg"/>
        </div>

        <div v-else>

            <v-file-input
                show-size v-model="editedCoverImg"
                truncate-length="15"
                prepend-icon="mdi-image-area"
                label="Image de couverture"
                @change="uploadImg()"
                accept="image/*"
            />
        </div>

        <div class="d-flex mt-3 justify-space-between">
            <h2 class="mt-3">Informations du restaurant</h2>
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
        </div>

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

        <div class="d-flex mt-3 justify-space-between">
            <h2 class="mt-3 mb-3">Informations de contact</h2>
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
        </div>


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
            <p>{{ restaurantInfos.Email }}</p>

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

        <div class="d-flex mt-3 justify-space-between">
            <h2 class="mt-3 mb-3">Informations banquaires</h2>
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
        </div>

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

        <v-divider class="mt-4 mb-4"/>

        <div class="d-flex justify-center mb-3">
            <v-btn color="error" rounded @click="openConfirmDelete()">
                Supprimer mon compte
            </v-btn>
        </div>

        <v-dialog v-model="showDialogConfirmDelete" width="600px">
            <v-card>
                <v-card-title>
                    Comfirmez-vous la suppression de votre compte ?
                </v-card-title>
                <v-card-text class="red--text">
                    Attention, cette action sera irréversible !
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        text
                        @click="showDialogConfirmDelete = !showDialogConfirmDelete"
                    >
                        Annuler
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                        text
                        color="error"
                        @click="deleteAccount()"
                    >
                        Supprimer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <eatbox-snackbar ref="snack"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SelectSchedule from './SelectSchedule.vue'
import {ValidationObserver, ValidationProvider} from "vee-validate";
import EatboxSnackbar from "../Snack/EatboxSnackbar.vue";
import {logoutUser} from "../../utils/auth";

@Component({
    components: {
        SelectSchedule,
        ValidationObserver,
        ValidationProvider,
        EatboxSnackbar,
    },
})

export default class RestaurantInfos extends Vue {
    $refs!: {
        schedule: SelectSchedule,
        obsInfo: InstanceType<typeof ValidationObserver>,
        obsContact: InstanceType<typeof ValidationObserver>,
        obsBank: InstanceType<typeof ValidationObserver>,
        snack: EatboxSnackbar,
    }

    restaurantId = ""

    restaurantInfos = {
        Name: "",
        Phone: "",
        CoverImg: "",
        Email: "",
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

    editImg = false
    loadingImg = false
    editedCoverImg = null
    resultCoverImg: ArrayBuffer | string | null = null

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
    editedSiret = ""

    editBank = false
    loadingBank = false
    editedAccountName = ""
    editedBic = ""
    editedIban = ""

    showDialogConfirmDelete = false

    getData(data, id) {
        this.restaurantId = id;
        this.restaurantInfos = data;
        this.$refs.schedule.getHours(data.hours);
    }

    showEditImg() {
        this.editImg = true
    }

    uploadImg() {
        const reader = new FileReader();
        if (this.editedCoverImg !== null) {
            reader.onloadend = () => {
                this.resultCoverImg = reader.result;
            }
            reader.readAsDataURL(this.editedCoverImg);
        } else {
            this.resultCoverImg = null;
        }
    }

    showEditInfo() {
        this.editedRestaurantName = this.restaurantInfos.Name;
        this.editedAddress = JSON.parse(JSON.stringify(this.restaurantInfos.Address));
        this.editInfo = true;
    }

    showEditContact() {
        this.editedPhone = this.restaurantInfos.Phone;
        this.editedSiret = this.restaurantInfos.Legal.SIRET;
        this.editContact = true;
    }

    showEditBank() {
        this.editedAccountName = this.restaurantInfos.Legal.AccountName;
        this.editedBic = this.restaurantInfos.Legal.BIC;
        this.editedIban = this.restaurantInfos.Legal.IBAN;
        this.editBank = true;
    }

    updateImg() {
        if (this.resultCoverImg !== null) {
            this.loadingImg = true;
            this.restaurantInfos.CoverImg = this.resultCoverImg.toString();

            this.updateRestaurant();
        }
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

    updateHours(hours) {
        this.restaurantInfos.hours = hours;
        this.updateRestaurant();
    }

    updateRestaurant() {
        let access_token = this.$cookies.get('token');
        this.$axios.put("/users/restaurants/update/" + this.restaurantId, {
            data: {
                Phone: this.restaurantInfos.Phone,
                hours: this.restaurantInfos.hours,
                CoverImg: this.restaurantInfos.CoverImg,
                Name: this.restaurantInfos.Name,
                Address: this.restaurantInfos.Address,
                Legal: this.restaurantInfos.Legal
            }
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(() => {
            this.$refs.snack.openSnackbar("Mise à jour efféctué avec succès", "success");
        }).catch(() => {
            this.$refs.snack.openSnackbar("Erreur lors de la mise à jour", "error");
        }).finally(() => {
            this.loadingImg = false;
            this.loadingInfo = false;
            this.loadingContact = false;
            this.loadingBank = false;
            this.editImg = false;
            this.editInfo = false;
            this.editContact = false;
            this.editBank = false;
        })
    }

    openConfirmDelete() {
        this.showDialogConfirmDelete = true;
    }

    deleteAccount() {
        let access_token = this.$cookies.get('token')
        this.$axios.delete("/users/restaurants/delete/" + this.$cookies.get('user_id'), {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(() => {
            this.$axios.post("/auth/logout", {
                token: this.$cookies.get('token'),
                id: this.$cookies.get('user_id'),

            }).then(r => {
                logoutUser()
            })

            this.$router.push('/connexion')
        })
    }

}
</script>

<style scoped>
.img-container {
    position: relative;
    margin-bottom: 75px;
}

.profile-img {
    position: absolute;
    bottom: -75px;
    left: 0;
}
</style>
