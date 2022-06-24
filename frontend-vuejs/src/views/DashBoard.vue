

<template>

    <div class="side-padding">
        <DashboardRestaurant v-if="this.role==='Restaurant'" />
    </div>


</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import DashboardRestaurant from "./Restaurateur/DashboardRestaurant.vue";

@Component({
    components: {DashboardRestaurant},
})

export default class DashBoard extends Vue {
    role = this.$store.state.UserRole
}
</script>

