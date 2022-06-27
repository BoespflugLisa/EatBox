<template>
    <div id="notification-list" class="side-padding">
        <v-btn block rounded color="secondary" large class="mt-7">
            Tout marquer comme lu
        </v-btn>
        <restaurateur-notification v-if="isUserConnected" />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RestaurateurNotification from '../components/Notifications/RestaurateurNotification.vue'

@Component({
    components: {
        RestaurateurNotification
    },
})

export default class NotificationList extends Vue {
 isUserConnected = true
}
</script>

<style scoped>

</style>