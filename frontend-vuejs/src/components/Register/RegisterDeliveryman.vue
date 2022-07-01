<template>
    <div id="register-deliveryman">
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
                                        <validation-provider name="photo de profil" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-file-input
                                                show-size v-model="ProfileImg"
                                                truncate-length="15"
                                                prepend-icon="mdi-image"
                                                label="Photo de profil"
                                                @change="uploadImg()"
                                                accept="image/*"
                                                :error-messages="errors"
                                                :success="validated"
                                            />
                                        </validation-provider>

                                        <validation-provider name="nom" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-text-field
                                                v-model="form.lastname"
                                                label="Nom"
                                                prepend-icon="mdi-card-account-details"
                                                :error-messages="errors"
                                                :success="validated"
                                            ></v-text-field>
                                        </validation-provider>

                                        <validation-provider name="prénom" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-text-field
                                                v-model="form.name"
                                                label="Prénom"
                                                prepend-icon="mdi-card-account-details"
                                                :error-messages="errors"
                                                :success="validated"
                                            ></v-text-field>
                                        </validation-provider>

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

                                        <validation-provider name="numéro IBAN" rules="required"
                                                             v-slot="{ errors, validated }">
                                            <v-text-field
                                                v-model="form.iban"
                                                label="Numéro IBAN"
                                                prepend-icon="mdi-bank"
                                                :error-messages="errors"
                                                :success="validated"
                                            ></v-text-field>
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
import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
import {required, email, min} from 'vee-validate/dist/rules';

@Component({
    components: {
        ValidationObserver,
        ValidationProvider
    },
})

export default class RegisterComponent extends Vue {
    name = 'RegisterRestaurant.vue'

    loading = false

    created() {
        extend('required', required)
        extend('email', email)
        extend('min', min)
    }


    isEditing = false

    ReturnError = false
    error_login = ""


    $refs!: {
        obsForm: InstanceType<typeof ValidationObserver>
    }


    ProfileImg = null
    resultProfileImg: ArrayBuffer | string | null = null


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
    }

    form = {
        ProfileImg: this.resultProfileImg,
        email: "",
        password: "",
        name: "",
        lastname: "",
        iban: "",
        phone: "",
        role: this.$cookies.get('role')
    }

    show2 = false

    async register() {
        this.loading = true
        this.$refs.obsForm.validate().then(async success => {
            if (success) {
                try {
                    await registerUser(this.form)
                        .then(r => {
                            this.loading = false
                            this.$router.go(0)
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
