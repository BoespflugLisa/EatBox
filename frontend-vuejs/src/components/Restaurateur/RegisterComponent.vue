<template>
    <div v_if="">
        <v-content>
            <p class="text-center">Veuillez renseigner tous les champs pour inscrire votre restaurant à la liste de nos
                heureux partenaires.</p>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        prepend-icon="mdi-account"
                                        v-model="form.email"
                                        label="E-mail"
                                        :rules="[rules.required, rules.email]"
                                    ></v-text-field>
                                    <v-text-field
                                        id="password"
                                        v-model="form.password"
                                        label="Password"
                                        prepend-icon="mdi-lock"
                                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="[rules.required]"
                                        :type="show2 ? 'text' : 'password'"
                                        @click:append="show2 = !show2"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.username"
                                        label="Nom"
                                        :rules="[rules.required]"
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
                                        :rules="[rules.required, rules.phone]"
                                        type="number"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.legal.siret"
                                        label="Numéro de SIRET"
                                        :rules="[rules.required]"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.legal.iban"
                                        label="Numéro IBAN"
                                        :rules="[rules.required]"
                                    ></v-text-field>

                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="register">Register</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {registerUser} from "../../utils/auth";

@Component({
    components: {},
})

export default class RegisterComponent extends Vue {
    name = 'RegisterComponent'

    types = ['Fast-Food', 'Asiatique', 'Mexicain', 'Coréen', 'Breton', 'Japonais', 'Africaine', 'Kebab', 'Orientale']
    isEditing = false

    form = {
        email: "",
        password: "",
        username: "",
        legal: {
            siret:"",
            iban:"",
        },
        phone:"",
        type:"",
    }

    show2 = false


    rules = {
        required: value => !!value || 'Champ requis.',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Format e-mail non respecté.'
        },
        phone: value => {
            const pattern = /[0-9]{10}/
            return pattern.test(value) || "Format invalide : '0612345678'"
        }
    }

    async register() {
        try {
            await registerUser(this.form)
                .then(r => {
                    this.$router.push('/')
                    this.$emit('change-theme')
                })

        } catch (err) {
            console.log(`Erreur: ${err}`)
        }
    }
}
</script>

<style></style>
