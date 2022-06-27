<template v-if="connectedUserRole === 'Restaurant'">
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
                        <p>{{ notif.date }}</p>
                        <p>{{ notif.message }}</p>
                    </div>

                    <v-btn icon  @click="delNotification(index, 'command')">
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
                        <p>{{ notif.date }}</p>
                        <p>{{ notif.message }}</p>
                    </div>

                    <v-btn icon  @click="delNotification(index, 'deliveryman')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                </div>
            </v-card-text>
        </v-card>

        <h2 class="mt-7">
            Activités récentes
        </h2>

        <p v-if="recentActivities.length === 0">Tout est calme pour le moment...</p>

        <v-card
            color="tertiary"
            v-for="(notif, index) in recentActivities"
            :key="notif.id"
            class="mt-3 rounded-lg"
        >
            <v-card-text>
                <div class="d-flex justify-space-between align-center">
                    <div class="font-16">
                        <p>{{ notif.date }}</p>
                        <p>{{ notif.message }}</p>
                    </div>
                    <v-btn icon @click="delNotification(index, 'recentActivities')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>

    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class RestaurateurNotification extends Vue {
    command: Array<unknown> = []
    deliveryman: Array<unknown> = []
    recentActivities: Array<unknown> = []

    connectedUserRole = "Restaurant";

    notifications = [
        {
            id: "1",
            date: "16:11 - 13/06/2022",
            type: "command",
            message: "Nouvelle commande !",
        },
        {
            id: "2",
            date: "14:15 - 13/06/2022",
            type: "command",
            message: "Nouvelle commande !",
        },
        {
            id: "3",
            date: "16:23 - 13/06/2022",
            type: "deliveryman",
            message: "Livreur arrivé !",
        },
        {
            id: "4",
            date: "14:31 - 13/06/2022",
            type: "deliveryman",
            message: "Livreur arrivé !",
        },
        {
            id: "5",
            date: "17:00 - 13/06/2022",
            type: "recent_activities",
            message: "Bravo ! 10 commandes aujourd'hui",
        },
    ]

    created() {
        this.getNotifications()
    }

    getNotifications() {
        this.notifications.forEach(notification => {
            switch (notification.type) {
                case "command":
                    this.command.push(notification);
                    break;

                case "deliveryman":
                    this.deliveryman.push(notification);
                    break;

                case "recent_activities":
                    this.recentActivities.push(notification);
                    break;
            }
        });
    }

    delNotification(index, datatable: string) {
        switch (datatable) {
            case "command":
                this.command.splice(index, 1);
                break;
            case "deliveryman":
                this.deliveryman.splice(index, 1);
                break;
            case "recentActivities":
                this.recentActivities.splice(index, 1);
                break;
        }
    }
}
</script>

<style scoped>
</style>