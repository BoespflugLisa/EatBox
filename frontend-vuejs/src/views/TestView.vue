<template>
    <div id="connection-form" class=" side-padding">

        <v-tabs fixed-tabs>
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <LoginComponent class="pb-15 pl-5 pr-5"/>
            </v-tab-item>
            <v-tab-item>
                <RegisterComponent class="pb-15 pl-5 pr-5"/>
            </v-tab-item>
        </v-tabs>



    </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from "../components/Restaurateur/RegisterComponent.vue";

@Component({
    components: {
        LoginComponent,
        RegisterComponent,
    },
})

export default class LoginRegister extends Vue {
    name = "LoginRegister"

    items = [
        {tab: "Se Connecter"},
        {tab: "Créer un compte"},
    ]

    isUserConnected = false



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