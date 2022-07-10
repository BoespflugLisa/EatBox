<template>
    <div id="restaurant-infos">

        <div class="d-flex mt-3 justify-space-between">
            <h2>Image de profil</h2>
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

        <div class="d-flex justify-center mt-3 img-container" v-if="!editImg">
            <div>
                <v-img class="rounded-circle profile-img" height="150px" width="150px"
                       :src="this.deliverymanInfos.ProfileImg"/>
            </div>
        </div>

        <v-file-input v-else
                      show-size v-model="editedProfileImg"
                      truncate-length="15"
                      prepend-icon="mdi-image"
                      label="Image de profil"
                      @change="uploadImg()"
                      accept="image/*"
        />

        <div class="d-flex mt-3 justify-space-between">
            <h2>Informations personnelles</h2>
            <v-btn
                icon class="ml-3"
                color="primary"
                v-if="!editInfo"
                @click="showEditInfo()"
            >
                <v-icon size="25">mdi-pencil</v-icon>
            </v-btn>
            <div v-else class="ml-3">
                <v-btn
                    icon
                    color="primary"
                    @click="updateInfo()"
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
            <h3 class="mt-3 mb-3">Nom</h3>
            <p v-if="!editInfo">{{ deliverymanInfos.Firstname }}</p>
            <validation-provider v-else name="Nom" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedFirstName"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Prénom</h3>
            <p v-if="!editInfo">{{ deliverymanInfos.Lastname }}</p>
            <validation-provider v-else name="Prénom" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedLastName"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>
        </validation-observer>

        <v-divider class="mt-4 mb-4"/>

        <div class="d-flex mt-3 justify-space-between">
            <h2>Informations de contact</h2>
            <v-btn
                icon class="ml-3"
                color="primary"
                v-if="!editContact"
                @click="showEditContact()"
            >
                <v-icon size="25">mdi-pencil</v-icon>
            </v-btn>
            <div v-else class="ml-3">
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
            <p v-if="!editContact">{{ deliverymanInfos.Phone }}</p>
            <validation-provider v-else name="Téléphone" rules="required|digits:10" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedPhone"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>
        </validation-observer>

        <h3 class="mt-3 mb-3">Adresse mail</h3>
        <p>{{ deliverymanInfos.user.email }}</p>


        <v-divider class="mt-4 mb-4"/>

        <div class="d-flex mt-3 justify-space-between">
            <h2>Informations banquaires</h2>
            <v-btn
                icon class="ml-3"
                color="primary"
                v-if="!editBank"
                @click="showEditBank()"
            >
                <v-icon size="25">mdi-pencil</v-icon>
            </v-btn>
            <div v-else class="ml-3">
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
            <p v-if="!editBank">{{ deliverymanInfos.AccountName }}</p>
            <validation-provider v-else name="Nom de compte" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedAccountName"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Numéro IBAN</h3>
            <p v-if="!editBank">{{ deliverymanInfos.IBAN }}</p>
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
import {ValidationObserver, ValidationProvider} from "vee-validate";
import EatboxSnackbar from "../Snack/EatboxSnackbar.vue";
import {logoutUser} from "../../utils/auth";

@Component({
    components: {
        ValidationObserver,
        ValidationProvider,
        EatboxSnackbar,
    }
})

export default class LivreurInfos extends Vue {
    $refs!: {
        obsInfo: InstanceType<typeof ValidationObserver>,
        obsContact: InstanceType<typeof ValidationObserver>,
        obsBank: InstanceType<typeof ValidationObserver>,
        snack: EatboxSnackbar,
    }

    deliverymanId = ""

    deliverymanInfos = {
        ProfileImg: "",
        Firstname: "",
        Lastname: "",
        Phone: "",
        user: {
            email: ""
        },
        AccountName: "",
        IBAN: ""
    }

    editImg = false
    loadingImg = false
    editedProfileImg = null
    resultProfileImg: ArrayBuffer | string | null = null

    editInfo = false
    loadingInfo = false
    editedFirstName = ""
    editedLastName = ""

    editContact = false
    loadingContact = false
    editedPhone = ""

    editBank = false
    loadingBank = false
    editedAccountName = ""
    editedIban = ""

    showDialogConfirmDelete = false

    getData(data, id) {
        this.deliverymanId = id;
        this.deliverymanInfos = data;
    }

    showEditImg() {
        this.editImg = true
    }

    uploadImg() {
        if (this.editedProfileImg !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.resultProfileImg = reader.result;
            }
            reader.readAsDataURL(this.editedProfileImg);
        } else {
            this.resultProfileImg = null;
        }
    }

    showEditInfo() {
        this.editedFirstName = this.deliverymanInfos.Firstname;
        this.editedLastName = this.deliverymanInfos.Lastname;
        this.editInfo = true;
    }

    showEditContact() {
        this.editedPhone = this.deliverymanInfos.Phone;
        this.editContact = true;
    }

    showEditBank() {
        this.editedAccountName = this.deliverymanInfos.AccountName;
        this.editedIban = this.deliverymanInfos.IBAN;
        this.editBank = true;
    }

    updateImg() {
        if (this.resultProfileImg !== null) {
            this.loadingImg = true;
            this.deliverymanInfos.ProfileImg = this.resultProfileImg.toString();
            this.updateDeliveryman();
        }
    }

    updateInfo() {
        this.$refs.obsInfo.validate().then(success => {
            if (success) {
                this.loadingInfo = true;
                this.deliverymanInfos.Firstname = this.editedFirstName;
                this.deliverymanInfos.Lastname = this.editedLastName;
                this.updateDeliveryman();
            }
        })
    }

    updateContact() {
        this.loadingContact = true;
        this.deliverymanInfos.Phone = this.editedPhone;
        this.updateDeliveryman();
    }

    updateBank() {
        this.loadingBank = true;
        this.deliverymanInfos.AccountName = this.editedAccountName;
        this.deliverymanInfos.IBAN = this.editedIban;
        this.updateDeliveryman();
    }

    updateDeliveryman() {
        this.$axios.put("/users/deliverymen/update/" + this.deliverymanId, {
            data: {
                Lastname: this.deliverymanInfos.Lastname,
                Firstname: this.deliverymanInfos.Firstname,
                AccountName: this.deliverymanInfos.AccountName,
                Phone: this.deliverymanInfos.Phone,
                IBAN: this.deliverymanInfos.IBAN,
                ProfileImg: this.deliverymanInfos.ProfileImg,
            }
        }).then(() => {
            this.$refs.snack.openSnackbar("Mise à jour effectué avec succès", "success");
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
        this.$axios.delete("/users/deliverymen/delete/" + this.$cookies.get('user_id')).then(r => {
            logoutUser()
        })
        this.$router.push('/connexion')
    }

}
</script>

<style scoped>

</style>
