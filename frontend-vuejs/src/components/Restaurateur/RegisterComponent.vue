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
                            <v-card class="elevation-12">
                                <v-card-text>
                                    <validation-provider rules="required">
                                        <v-text-field
                                            prepend-icon="mdi-account"
                                            v-model="form.email"
                                            label="E-mail"
                                            :rules="[rules.email]"
                                        ></v-text-field>
                                        <v-text-field
                                            id="password"
                                            v-model="form.password"
                                            label="Password"
                                            prepend-icon="mdi-lock"
                                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.password]"
                                            :type="show2 ? 'text' : 'password'"
                                            @click:append="show2 = !show2"
                                        ></v-text-field>

                                        <validation-provider name="Photo du restaurant" rules="required"
                                                             v-slot="{ invalid, validated }">
                                            <v-file-input
                                                show-size v-model="CoverImg"
                                                truncate-length="15"
                                                prepend-icon="mdi-image-area"
                                                label="Image de couverture"
                                                @change="uploadImg()"
                                                accept="image/*"
                                                :error-messages="invalid"
                                                :success="validated"
                                            />
                                        </validation-provider>
                                        <v-text-field
                                            required
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
                                            required
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="form.legal.iban"
                                            label="Numéro IBAN"
                                            :rules="[rules.required, /*rules.iban*/]"
                                        ></v-text-field>
                                        <!--FR1420041010050500013M02606-->
                                    </validation-provider>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary" :disabled="invalid || !validated" v-on:click="register">Register
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
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
    name = 'RegisterComponent'

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
                this.form.resultProfileImg = reader.result;
            }
            reader.readAsDataURL(this.ProfileImg);
        } else {
            this.form.resultProfileImg = null;
        }

        if (this.CoverImg !== null) {
            reader.onloadend = () => {
                this.form.resultCoverImg = reader.result;
            }
            reader.readAsDataURL(this.CoverImg);
        } else {
            this.form.resultCoverImg = null;
        }
    }

    form = {
        resultProfileImg: this.resultProfileImg,
        resultCoverImg: this.resultCoverImg,
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
        this.$refs.obsForm.validate().then(success => {
            if (success) {
                try {
                    console.log(this.form)
                    /*await registerUser(this.form)
                        .then(r => {
                            this.$router.push('/')
                        })*/

                } catch (err: any) {
                    console.log(`Erreur: ${err.response.data.message}`)
                    this.ReturnError = true;
                    this.error_login = err.response.data.message
                }
            }
        })
    }
}
</script>

<style></style>
