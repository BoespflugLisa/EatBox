<template>
    <div id="notification-list" class="side-padding">
        <v-btn block rounded color="secondary" large class="mt-7" @click="readAll">
            Tout marquer comme lu
        </v-btn>
        <display-notification
            ref="notif"
            v-if="isUserConnected"
            v-on:remove-notif="$emit('remove-notif')"
            v-on:remove-all-notif="$emit('remove-all-notif')"
        />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import DisplayNotification from '../components/Notifications/DisplayNotification.vue'

@Component({
    components: {
        DisplayNotification
    },
})

export default class NotificationList extends Vue {
    $refs!: {
        notif: DisplayNotification
    }

    isUserConnected = this.$cookies.get('auth');
    userRole = this.$cookies.get('role');

    readAll() {
        switch (this.userRole) {
            case "Restaurant" :
                this.$refs.notif.readAll();
        }
    }
}
</script>

<style scoped>

</style>