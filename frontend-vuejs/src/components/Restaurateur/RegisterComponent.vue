<template>
    <div>
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
                                        <validation-provider v-slot="{ errors, valid }" rules="required|email" name="e-mail">
                                            <v-text-field
                                                prepend-icon="mdi-account"
                                                v-model="form.email"
                                                label="E-mail"
                                                :error-messages="errors"
                                                :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                        <validation-provider name="mot de passe" rules="required|min:8" v-slot="{ errors, valid }">
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
                                            <validation-provider name="photo du restaurant" rules="required" v-slot="{ errors, validated }">
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
                                            <v-text-field
                                                v-model="form.username"
                                                label="Nom"
                                            ></v-text-field>
                                            <v-autocomplete
                                                v-model="form.type"
                                                :items="types"
                                                :readonly="isEditing"
                                                label="Type de nourriture"
                                                :rules="[rules.required]"
                                                prepend-icon="mdi-food"
                                            ></v-autocomplete>
                                            <v-text-field
                                                v-model="form.phone"
                                                label="Numéro de téléphone"
                                                :rules="[rules.required, /*rules.phone*/]"
                                                prepend-icon="mdi-phone"
                                            ></v-text-field>
                                            <!--                                    +33123456789-->
                                            <v-text-field
                                                v-model="form.legal.siret"
                                                label="Numéro de SIRET"
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="form.legal.iban"
                                                label="Numéro IBAN"
                                            ></v-text-field>
                                            <!--FR1420041010050500013M02606-->
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
import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
import {required, email, min} from 'vee-validate/dist/rules';

@Component({
    components: {
        ValidationObserver,
        ValidationProvider
    },
})

export default class RegisterComponent extends Vue {
    name = 'RegisterComponent'

    loading = false

    created(){
        extend('required', required)
        extend('email', email)
        extend('min', min)
    }

    types = ['Fast-Food', 'Asiatique', 'Mexicain', 'Italien']
    isEditing = false

    ReturnError = false
    error_login = ""


    $refs!: {
        obsForm: InstanceType<typeof ValidationObserver>
    }

    resultCoverImg: ArrayBuffer | string | null = null
    ProfileImg = null
    resultProfileImg: ArrayBuffer | string | null = null
    CoverImg = null

    uploadImg() {
        const reader = new FileReader();
        if (this.ProfileImg !== null) {
            reader.onloadend = () => {
                this.form.ProfileImg = reader.result;
            }
            reader.readAsDataURL(this.ProfileImg);
        } else {
            this.form.ProfileImg = null;
        }

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
        CoverImg: this.resultProfileImg,
        ProfileImg: this.resultCoverImg,
        email: "",
        password: "",
        username: "",
        legal: {
            siret: "",
            iban: "",
        },
        phone: "",
        type: "",
        role: this.$cookies.get('role')
    }

    show2 = false

    rules = {
        required: value => !!value || 'Champ requis.',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Format e-mail non respecté.'
        },
        phone: value => {
            const pattern = /^((\+)33|0)[1-9](\d{2}){4}$/
            return pattern.test(value) || "Format invalide : '+33665840125' ou '0123456789"
        },
        password: value => value.length >= 8 || 'Au moins 8 caractères',
        iban: value => {
            const pattern = /^FR\d{12}[A-Z\d]{11}\d{2}$/
            return pattern.test(value) || "IBAN invalide"
        }
    }


    async register() {
        this.loading=true
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
                    console.log(`Erreur: ${err.response.data.message}`)
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
