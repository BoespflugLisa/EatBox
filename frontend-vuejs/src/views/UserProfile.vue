<template>
    <div id="user-profile">
        <profile-client-view v-if="role === 'Client'"/>

        <profile-deliveryman-view v-if="role === 'Livreur'"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProfileDeliverymanView from '../components/Livreur/ProfileDeliverymanView.vue'
import ProfileClientView from '../components/Client/ProfileClientView.vue'

@Component({
    components: {
        ProfileDeliverymanView,
        ProfileClientView,
    },
})

export default class UserProfile extends Vue{
    role = "Client"/*this.$cookies.get('role')*/;
}
</script>

<style scoped>

</style>