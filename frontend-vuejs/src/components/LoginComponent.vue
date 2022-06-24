<template>
    <div>
        <v-main>
            <p class="text-center">Utilisez votre nom d'utilisateur et votre mot de passe pour vous connecter au EatBox
                Restaurant.</p>
            <v-alert
                color="accent"
                shaped
                text
                type="error"
                @click="this.ReturnError = false"
                v-show="this.ReturnError"
            >
                {{this.error_login}}
            </v-alert>
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
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        prepend-icon="mdi-lock"
                                        :rules="[rules.required]"
                                        label="Password"
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"
                                    ></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" v-on:click="login">Login
                                        </v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {loginUser} from '../utils/auth'


@Component({
    components: {},
})

export default class LoginComponent extends Vue {
    name = 'LoginComponent'

    ReturnError = false
    error_login = ""
    form = {
        email: "",
        password: ""
    }
    show1 = false
    rules = {
        required: value => !!value || 'Champ requis.',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Format e-mail non respecté.'
        }
    }

    urlParams:any = new URLSearchParams(window.location.search)

    async login() {
        try {
            await loginUser(this.form.email, this.form.password)
                .then(r => {
                    if(this.urlParams.get('redirect') != null){
                        this.$router.push(this.urlParams.get('redirect').toString())
                    } else {
                        this.$router.push('/')
                    }
                })

        } catch (err:any) {
            console.log(`Erreur: ${err.response.data.message}`)
            this.ReturnError = true;
            this.error_login = err.response.data.message
        }
    }
}
</script>

<style></style>
