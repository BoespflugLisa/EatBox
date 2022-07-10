<template>
    <div class="client-infos">
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
            <p v-if="!editInfo">{{ clientInfos.Lastname }}</p>
            <validation-provider v-else name="Nom" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedLastname"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Prénom</h3>
            <p v-if="!editInfo">{{ clientInfos.Firstname }}</p>
            <validation-provider v-else name="Prénom" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedFirstname"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Numéro de téléphone</h3>
            <p v-if="!editInfo">{{ clientInfos.Phone }}</p>
            <validation-provider name="Telephone" v-else rules="required|digits:10" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedPhone"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Adresse mail</h3>
            <p>{{ clientInfos.user.email }}</p>

            <h3 class="mt-3 mb-3">Adresse</h3>
            <p v-if="!editInfo">{{
                    clientInfos.Address.Number + ' ' + clientInfos.Address.Street + ' - ' + clientInfos.Address.Code + ' ' + clientInfos.Address.Town
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
import {Component, Vue} from "vue-property-decorator";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import EatboxSnackbar from "../Snack/EatboxSnackbar.vue";
import {logoutUser} from "../../utils/auth";

@Component({
    components: {
        ValidationObserver,
        ValidationProvider,
        EatboxSnackbar
    },
})

export default class ClientInfos extends Vue {
    $refs!: {
        obsInfo: InstanceType<typeof ValidationObserver>,
        snack: EatboxSnackbar
    }

    clientId = ""
    clientInfos = {
        Firstname: "",
        Lastname: "",
        Phone: "",
        Address: {
            Number: "",
            Street: "",
            Town: "",
            Code: 0
        },
        user: {
            email: "",
        }
    }

    editInfo = false
    loadingInfo = false
    editedFirstname = ""
    editedLastname = ""
    editedPhone = ""
    editedAddress = {
        Number: "",
        Street: "",
        Town: "",
        Code: 0
    }

    showDialogConfirmDelete = false

    getData(data, id) {
        this.clientId = id
        this.clientInfos = data
    }

    showEditInfo() {
        this.editedFirstname = this.clientInfos.Firstname;
        this.editedLastname = this.clientInfos.Lastname;
        this.editedPhone = this.clientInfos.Phone;
        this.editedAddress = JSON.parse(JSON.stringify(this.clientInfos.Address));
        this.editInfo = true;
    }

    updateInfo() {
        this.$refs.obsInfo.validate().then(success => {
            if (success) {
                this.clientInfos.Lastname = this.editedLastname;
                this.clientInfos.Firstname = this.editedFirstname;
                this.clientInfos.Phone = this.editedPhone;
                this.clientInfos.Address = this.editedAddress;
                this.$axios.put("/users/clients/update/" + this.clientId, {
                    data: {
                        Lastname: this.editedLastname,
                        Firstname: this.editedFirstname,
                        Address: this.editedAddress,
                        Phone: this.editedPhone
                    }
                }).then(() => {
                    this.$refs.snack.openSnackbar("Mise à jour efféctué avec succès", "success");
                }).catch(() => {
                    this.$refs.snack.openSnackbar("Erreur lors de la mise à jour", "error");
                }).finally(() => {
                    this.loadingInfo = false
                    this.editInfo = false
                })
            }
        })
    }

    openConfirmDelete() {
        this.showDialogConfirmDelete = true;
    }

    deleteAccount() {
        this.$axios.delete("/users/clients/delete/" + this.$cookies.get('user_id')).then(r => {
            logoutUser()

            this.$router.push('/connexion')
        })
    }

}
</script>

<style scoped>

</style>