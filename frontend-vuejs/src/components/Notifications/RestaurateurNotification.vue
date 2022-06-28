<template>
    <div id="restaurateur-notification">
        <h2 class="mt-7">
            Notifications des commandes
        </h2>

        <p v-if="command.length === 0">Tout est calme pour le moment...</p>

        <v-card
            color="tertiary"
            v-for="(notif, index) in command"
            :key="notif.id"
            class="mt-3 rounded-lg"
        >
            <v-card-text>
                <div class="d-flex justify-space-between align-center">
                    <div class="font-16">
                        <p>{{ notif.Date }}</p>
                        <p>{{ notif.Message }}</p>
                    </div>

                    <v-btn icon @click="delNotification(notif, index, 'command')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                </div>
            </v-card-text>
        </v-card>

        <h2 class="mt-7">
            Notifications des livreurs
        </h2>

        <p v-if="deliveryman.length === 0">Tout est calme pour le moment...</p>

        <v-card
            color="tertiary"
            v-for="(notif, index) in deliveryman"
            :key="notif.id"
            class="mt-3 rounded-lg"
        >
            <v-card-text>
                <div class="d-flex justify-space-between align-center">
                    <div class="font-16">
                        <p>{{ notif.Date }}</p>
                        <p>{{ notif.Message }}</p>
                    </div>

                    <v-btn icon @click="delNotification(notif, index, 'deliveryman')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                </div>
            </v-card-text>
        </v-card>

        <eatbox-snackbar ref="snack"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import EatboxSnackbar from "../Snack/EatboxSnackbar.vue";

@Component({
    components: {
        EatboxSnackbar
    },
})

export default class RestaurateurNotification extends Vue {
    $refs!: {
        snack: EatboxSnackbar,
    }

    command: Array<unknown> = [];
    deliveryman: Array<unknown> = [];

    restaurantId = this.$cookies.get('user_id');

    data = {}

    mounted() {
        this.getNotifications()
    }

    getNotifications() {
        this.command = [];
        this.deliveryman = [];
        this.$axios_notifications.get("/notifications/restaurant/" + this.restaurantId).then(response => {
            this.data = response.data;
            response.data.notifications.forEach(notification => {
                if (notification.Types.Command) {
                    this.command.push(notification);
                } else if (notification.Types.Delivery) {
                    this.deliveryman.push(notification);
                }
            });
        })
    }

    readAll() {
        this.$axios_notifications.put("notifications/restaurant/" + this.restaurantId + "/readAll").then(() => {
            this.command = []
            this.deliveryman = []
        })
    }

    delNotification(notif, index, table) {
        switch (table) {
            case "command":
                this.command.splice(index, 1);
                break;
            case "deliveryman":
                this.deliveryman.splice(index, 1);
                break;
        }
        notif.Read = true;
        this.$axios_notifications.put("notifications/" + notif._id, {data: notif}).catch(() => {
            this.$refs.snack.openSnackbar("Erreur lors de la suppression de la notification", "error")
        });
    }
}
</script>

<style scoped>
</style>