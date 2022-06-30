<template>
    <div id="register-restaurant">
        <v-main>
            <p class="text-center">Veuillez renseigner tous les champs pour inscrire votre restaurant à la liste de nos
                heureux partenaires.</p>
            <v-alert
                color="accent"
                shaped
                text
                type="error"
                @click="this.ReturnError = false"
                v-show="this.ReturnError"
            >
                {{ this.error_login }}
            </v-alert>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <validation-observer ref="obsForm" v-slot="{ invalid, validated }">
                            <v-form>
                                <v-card class="elevation-12">
                                    <v-card-text>
                                        <validation-provider v-slot="{ errors, valid }" rules="required|email"
                                                             name="e-mail">
                                            <v-text-field
                                                prepend-icon="mdi-account"
                                                v-model="form.email"
                                                label="E-mail"
                                                :error-messages="errors"
                                                :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                        <validation-provider name="mot de passe" rules="required|min:8"
                                                             v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="form.password"
                                                label="Password"
                                                :couter=8
                                                prepend-icon="mdi-lock"
                                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show2 ? 'text' : 'password'"
                                                @click:append="show2 = !show2"
                                                :error-messages="errors"
                                                :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                        <validation-provider name="photo du restaurant" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-file-input
                                                show-size v-model="CoverImg"
                                                truncate-length="15"
                                                prepend-icon="mdi-image-area"
                                                label="Image de couverture"
                                                @change="uploadImg()"
                                                accept="image/*"
                                                :error-messages="errors"
                                                :success="validated"
                                            />
                                        </validation-provider>

                                        <validation-provider name="nom du restaurant" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-text-field
                                                v-model="form.name"
                                                label="Nom du restaurant"
                                                :error-messages="errors"
                                                :success="validated"
                                            ></v-text-field>
                                        </validation-provider>

                                        <v-autocomplete
                                            v-model="form.type"
                                            :items="types"
                                            :readonly="isEditing"
                                            label="Type de nourriture"
                                            :rules="[rules.required]"
                                            prepend-icon="mdi-food"
                                        ></v-autocomplete>
                                        <validation-provider name="téléphone" rules="required|digits:10"
                                                             v-slot="{ errors, validated }">
                                            <v-text-field
                                                v-model="form.phone"
                                                label="Numéro de téléphone"
                                                prepend-icon="mdi-phone"
                                                :error-messages="errors"
                                                :success="validated"
                                            ></v-text-field>
                                        </validation-provider>

                                        <validation-provider name="numéro de SIRET" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-text-field
                                                v-model="form.legal.siret"
                                                label="Numéro de SIRET"
                                                :error-messages="errors"
                                                :success="validated"
                                            ></v-text-field>
                                        </validation-provider>
                                        <validation-provider name="numéro IBAN" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-text-field
                                                v-model="form.legal.iban"
                                                label="Numéro IBAN"
                                                :error-messages="errors"
                                                :success="validated"
                                            ></v-text-field>
                                        </validation-provider>


                                        <h3>Adresse</h3>

                                        <validation-provider name="numéro" rules="required" v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="form.address.number"
                                                label="Numéro"
                                                :error-messages="errors"
                                                :success="valid"
                                            />
                                        </validation-provider>

                                        <validation-provider name="rue" rules="required" v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="form.address.street" label="Rue"
                                                :error-messages="errors"
                                                :success="valid"
                                            />
                                        </validation-provider>

                                        <validation-provider name="code postal" rules="required|numeric"
                                                             v-slot="{ errors, valid }">
                                            <v-text-field
                                                type="number"
                                                v-model="form.address.code" label="Code postal"
                                                :error-messages="errors"
                                                :success="valid"
                                            />
                                        </validation-provider>

                                        <validation-provider name="ville" rules="required" v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="form.address.town" label="Ville"
                                                :error-messages="errors"
                                                :success="valid"
                                            />
                                        </validation-provider>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            :loading="loading"
                                            color="primary"
                                            text
                                            :disabled="invalid || !validated"
                                            v-on:click="register">
                                            Register
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-form>
                        </validation-observer>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {registerUser} from "../../utils/auth";
import {ValidationObserver, ValidationProvider} from "vee-validate";

@Component({
    components: {
        ValidationObserver,
        ValidationProvider
    },
})

export default class RegisterComponent extends Vue {
    name = 'RegisterRestaurant.vue'

    loading = false

    types = ['Fast-Food', 'Asiatique', 'Mexicain', 'Italien']
    isEditing = false

    ReturnError = false
    error_login = ""


    $refs!: {
        obsForm: InstanceType<typeof ValidationObserver>
    }

    resultCoverImg: ArrayBuffer | string | null = null
    CoverImg = null

    uploadImg() {
        const reader = new FileReader();
        if (this.CoverImg !== null) {
            reader.onloadend = () => {
                this.form.CoverImg = reader.result;
            }
            reader.readAsDataURL(this.CoverImg);
        } else {
            this.form.CoverImg = null;
        }
    }

    form = {
        CoverImg: this.resultCoverImg,
        email: "",
        password: "",
        name: "",
        legal: {
            siret: "",
            iban: "",
        },
        phone: "",
        type: "",
        address: {
            number: "",
            street: "",
            code: "",
            town: "",
        },
        role: this.$cookies.get('role')
    }

    show2 = false

    async register() {
        this.loading = true
        this.$refs.obsForm.validate().then(async success => {
            if (success) {
                try {
                    //console.log(this.form)
                    await registerUser(this.form)
                        .then(r => {
                            this.loading = false
                            this.$router.go(0)
                            //this.$router.push('/connexion')
                        })

                } catch (err: any) {
                    this.loading = false
                    this.ReturnError = true;
                    this.error_login = err.response.data.message
                }
            }
        })
        this.loading = false
    }
}
</script>

<style></style>
