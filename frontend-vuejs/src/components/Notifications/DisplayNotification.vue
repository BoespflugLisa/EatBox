<template>
    <div id="display-notification">
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
                        <p>{{ displayDate(notif.Date) }}</p>
                        <p>{{ notif.Message }}</p>
                    </div>

                    <v-btn icon @click="delNotification(notif, index, 'command')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                </div>
            </v-card-text>
        </v-card>

        <div v-if="this.$cookies.get('role') !== 'Livreur'">
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
                            <p>{{ displayDate(notif.Date) }}</p>
                            <p>{{ notif.Message }}</p>
                        </div>

                        <v-btn icon @click="delNotification(notif, index, 'deliveryman')">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>

                    </div>
                </v-card-text>
            </v-card>
        </div>
        <eatbox-snackbar ref="snack"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import moment from "moment";
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

    userId = this.$cookies.get('user_id');

    notificationConnection: WebSocket | null = null;

    mounted() {
        this.$emit('notif-page-ready')
        this.getNotifications();
        this.connectNotificationWS();
    }

    getNotifications() {
        let access_token = this.$cookies.get('token')
        this.command = [];
        this.deliveryman = [];
        this.$axios.get("/notifications/user/" + this.userId, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(response => {
            response.data.notifications.forEach(notification => {
                if (notification.Types.Command) {
                    this.command.push(notification);
                } else if (notification.Types.Delivery) {
                    this.deliveryman.push(notification);
                }
            });
        })
    }

    async connectNotificationWS() {
        if (this.$cookies.get("auth") && this.notificationConnection === null) {
            this.notificationConnection = await new WebSocket("ws://localhost:3033/notifications/socket/notifications/" + this.$cookies.get("user_id"))

            this.notificationConnection.onmessage = () => {
                this.getNotifications();
            }

            this.notificationConnection.onclose = () => {
                this.notificationConnection = null
            }
        }
    }

    displayDate(date) {
        moment.locale('fr')
        return moment(date).format('LLL');
    }

    readAll() {
        let access_token = this.$cookies.get('token');
        this.$axios.put("notifications/user/" + this.userId + "/readAll", null, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(() => {
            this.command = []
            this.deliveryman = []
            this.$emit('remove-all-notif')
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
        let access_token = this.$cookies.get('token');
        this.$axios.put("notifications/" + notif._id, {
            data: notif
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(() => {
            this.$emit('remove-notif')
        }).catch(() => {
            this.$refs.snack.openSnackbar("Erreur lors de la suppression de la notification", "error")
        });
    }
}
</script>

<style scoped>
</style>