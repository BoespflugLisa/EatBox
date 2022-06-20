<template>
    <div id="restaurateur-notification-display">
        <h2 class="mt-7">
            Notifications des commandes
        </h2>

        <p v-if="newCommand.length === 0">Tout est calme pour le moment...</p>

        <v-card
            color="tertiary"
            v-for="notif in newCommand"
            :key="notif.id"
            class="mt-3 rounded-lg"
        >
            <v-card-text>
                <div class="d-flex justify-space-between align-center">
                    <div>
                        <p>{{ notif.date }}</p>
                        <p>Nouvelle commande !</p>
                    </div>

                    <v-btn icon  @click="delNotification(index, 'newCommand')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                </div>
            </v-card-text>
        </v-card>

        <h2 class="mt-7">
            Notifications des livreurs
        </h2>

        <p v-if="deliverymanArrived.length === 0">Tout est calme pour le moment...</p>

        <v-card
            color="tertiary"
            v-for="notif in deliverymanArrived"
            :key="notif.id"
            class="mt-3 rounded-lg"
        >
            <v-card-text>
                <div class="d-flex justify-space-between align-center">
                    <div>
                        <p>{{ notif.date }}</p>
                        <p>Livreur arrivé !</p>
                    </div>

                    <v-btn icon  @click="delNotification(index, 'deliverymanArrived')">
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
            v-for="notif, index in recentActivities"
            :key="notif.id"
            class="mt-3 rounded-lg"
        >
            <v-card-text>
                <div class="d-flex justify-space-between align-center">
                    <div>
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

export default class NotificationDisplay extends Vue {
    newCommand: Array<unknown> = []
    deliverymanArrived: Array<unknown> = []
    recentActivities: Array<unknown> = []

    notifications = [
        {
            id: "1",
            date: "16:11 - 13/06/2022",
            type: "restaurateur_new_command",
        },
        {
            id: "2",
            date: "14:15 - 13/06/2022",
            type: "restaurateur_new_command",
        },
        {
            id: "3",
            date: "16:23 - 13/06/2022",
            type: "restaurateur_deliveryman_arrived",
        },
        {
            id: "4",
            date: "14:31 - 13/06/2022",
            type: "restaurateur_deliveryman_arrived",
        },
        {
            id: "5",
            date: "17:00 - 13/06/2022",
            type: "restaurateur_recent_activities",
            message: "Bravo ! 10 commandes aujourd'hui",
        },
    ]

    created() {
        this.getNotifications()
    }

    getNotifications() {
        this.notifications.forEach(notification => {
            switch (notification.type) {
                case "restaurateur_new_command":
                    this.newCommand.push(notification);
                    break;

                case "restaurateur_deliveryman_arrived":
                    this.deliverymanArrived.push(notification);
                    break;

                case "restaurateur_recent_activities":
                    this.recentActivities.push(notification);
                    break;
            }
        });
    }

    delNotification(index, datatable: string) {
        switch (datatable) {
            case "newCommand":
                this.newCommand.splice(index, 1);
                break;
            case "deliverymanArrived":
                this.deliverymanArrived.splice(index, 1);
                break;
            case "recentActivities":
                this.recentActivities.splice(index, 1);
                break;
        }
    }
}
</script>

<style scoped>
.vertical-line {
    height: 100%;
    border-left: 10px solid black;
}
</style>