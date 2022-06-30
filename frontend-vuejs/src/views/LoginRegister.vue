<template>
    <div id="connection-form" class=" side-padding">
        <div v-if="this.type.chosen">
            <v-btn
                v-on:click="choose"
                color="primary"
                text
            >
                Retour
            </v-btn>
            <v-tabs fixed-tabs>
                <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
                <v-tab-item>
                    <LoginComponent class="pb-15 pl-5 pr-5"/>
                </v-tab-item>
                <v-tab-item>
                    <register-restaurant class="pb-15 pl-5 pr-5" v-if="this.type.type === 'Restaurant'"/>
                    <register-deliveryman class="pb-15 pl-5 pr-5" v-if="this.type.type === 'Livreur'"/>
                    <register-client class="pb-15 pl-5 pr-5" v-if="this.type.type === 'Client'"/>
                </v-tab-item>

            </v-tabs>
        </div>
        <div v-else class="text-center mt-7">
            <h1>Je suis un...</h1>
            <div v-for="(type, index) in types" :key="index">
                <v-btn color="secondary" width="150px" class="mt-7" rounded v-on:click=setForms(index)>
                    {{ type }}
                </v-btn>
            </div>

        </div>
    </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginComponent from '../components/LoginComponent.vue'
import RegisterRestaurant from "../components/Register/RegisterRestaurant.vue";
import RegisterDeliveryman from "../components/Register/RegisterDeliveryman.vue";
import RegisterClient from "../components/Register/RegisterClient.vue";
import {setRole} from '../utils/auth'

@Component({
    components: {
        LoginComponent,
        RegisterRestaurant,
        RegisterDeliveryman,
        RegisterClient
    },
})

export default class LoginRegister extends Vue {

    name = "LoginRegister"

    items = [
        {tab: "Se Connecter"},
        {tab: "Créer un compte"},
    ]
    types = ["Restaurant", "Client", "Livreur"]
    type = {
        chosen: false,
        type: ""
    }

    setForms(index) {
        this.choose()
        setRole(this.types[index])
        this.type.type = this.types[index]
        this.$emit('change-theme')
    }

    choose() {
        this.type.chosen = !this.type.chosen
        this.type.type = ""
    }
}

</script>

<style scoped>
.input-group {
    margin: 1rem;
}

.input-group label {
    margin-right: 0.5rem;
}
</style>

<!--https://auth0.com/blog/beginner-vuejs-tutorial-with-user-login/-->