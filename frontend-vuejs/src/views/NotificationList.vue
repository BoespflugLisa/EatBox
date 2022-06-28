<template>
    <div id="notification-list" class="side-padding">
        <v-btn block rounded color="secondary" large class="mt-7" @click="readAll">
            Tout marquer comme lu
        </v-btn>
        <restaurateur-notification
            ref="notifRestaurant"
            v-if="isUserConnected && userRole === 'Restaurant'"
            v-on:remove-notif="$emit('remove-notif')"
            v-on:remove-all-notif="$emit('remove-all-notif')"
        />
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
    $refs!: {
        notifRestaurant: RestaurateurNotification
    }

    isUserConnected = this.$cookies.get('auth');
    userRole = this.$cookies.get('role');

    readAll() {
        switch (this.userRole) {
            case "Restaurant" :
                this.$refs.notifRestaurant.readAll();
        }
    }
}
</script>

<style scoped>

</style>