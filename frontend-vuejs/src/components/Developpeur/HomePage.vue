<template>
    <div id="home-page">
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
            <p v-if="!editInfo">{{ devInfos.Firstname }}</p>
            <validation-provider v-else name="Nom" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedFirstname"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>

            <h3 class="mt-3 mb-3">Prénom</h3>
            <p v-if="!editInfo">{{ devInfos.Lastname }}</p>
            <validation-provider v-else name="Prénom" rules="required" v-slot="{ errors, valid }">
                <v-text-field
                    v-model="editedLastname"
                    :error-messages="errors"
                    :success="valid"
                />
            </validation-provider>
        </validation-observer>

        <h3 class="mt-3 mb-3">Adresse mail</h3>
        <p>{{ devInfos.user.email }}</p>

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
    },
})

export default class HomePage extends Vue {

    $refs!: {
        obsInfo: InstanceType<typeof ValidationObserver>,
        snack: EatboxSnackbar
    }

    devInfos = {
        id: "",
        Firstname: "",
        Lastname: "",
        user: {
            email: "",
            id: "",
        }
    }

    editInfo = false
    loadingInfo = false
    editedFirstname = ""
    editedLastname = ""

    showDialogConfirmDelete = false

    mounted() {
        this.getData()
    }

    getData() {
        let access_token = this.$cookies.get('token');
        this.$axios.get('/users/developers/' + this.$cookies.get('user_id'), {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then((response) => {
            console.log(response.data.developer)
            this.devInfos = response.data.developer;
            console.log(this.devInfos)
        })
    }

    showEditInfo() {
        this.editedFirstname = this.devInfos.Firstname;
        this.editedLastname = this.devInfos.Lastname;
        this.editInfo = true;
    }

    updateInfo() {
        this.$refs.obsInfo.validate().then(success => {
            if (success) {
                this.devInfos.Lastname = this.editedLastname;
                this.devInfos.Firstname = this.editedFirstname;
                let access_token = this.$cookies.get('token');
                this.$axios.put("/users/developers/update/" + this.devInfos.id, {
                    data: this.devInfos
                }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
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
        let access_token = this.$cookies.get('token');
        this.$axios.delete("/users/developers/delete/" + this.$cookies.get('user_id'), {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(r => {
            logoutUser()
        })

        this.$router.push('/connexion')
    }
}
</script>

<style scoped>

</style>
