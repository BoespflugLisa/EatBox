<template>
    <div id="notification-list" class="side-padding">
        <v-btn block rounded color="secondary" large class="mt-7">
            Tout marquer comme lu
        </v-btn>
        <restaurateur-display v-if="isUserConnected" />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RestaurateurDisplay from '../components/Restaurateur/NotificationDisplay.vue'

@Component({
    components: {
        RestaurateurDisplay
    },
})

export default class NotificationList extends Vue {
 isUserConnected = true
}
</script>

<style scoped>

</style>