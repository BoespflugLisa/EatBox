<template>
    <div id="restaurant-information" class="side-padding">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <restaurant-infos ref="infos"/>
            </v-tab-item>
            <v-tab-item>
                <restaurant-pref v-on:ready="restaurantPrefReady()" ref="pref"/>
            </v-tab-item>
            <v-tab-item>
                <restaurant-sponsorship/>
            </v-tab-item>
        </v-tabs>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RestaurantInfos from "../../components/Restaurateur/RestaurantInfos.vue";
import RestaurantPref from "../../components/Restaurateur/RestaurantPref.vue";
import RestaurantSponsorship from "../../components/Restaurateur/RestaurantSponsorship.vue";

@Component({
    components: {
        RestaurantInfos,
        RestaurantPref,
        RestaurantSponsorship
    },
})

export default class RestaurantInformation extends Vue {
    $refs!: {
        infos: RestaurantInfos,
        pref: RestaurantPref,
    }

    restaurantId = this.$cookies.get('user_id')

    tab = 0;
    items = [
        {tab: "Info"},
        {tab: "Préférences"},
        {tab: "Parrainage"},
    ];

    restaurant = {
        belongs_to: "",
        Email: "",
    }

    mounted() {
        this.getData()
        if (this.$route.query.tab === '2') {
            this.tab = 2;
        }
    }

    getData() {
        this.$axios.get('restaurants/' + this.$cookies.get('user_id'))
            .then(response => {
                this.restaurant = response.data.restaurant;
                this.$axios_login.get('users/' + this.restaurant.belongs_to).then(res =>
                    {
                        this.restaurant.Email = res.data.user.Email;
                        this.$refs.infos.getData(this.restaurant, this.restaurantId);
                    }
                )
            });
    }

    restaurantPrefReady() {
        this.$refs.pref.getPreferences(this.restaurant, this.restaurantId)
    }
}
</script>

<style scoped>
@media screen and (min-width: 960px) {
    .info-menu {
        margin-top: 5px;
    }

    .info-card {
        display: flex;
        justify-content: center;
        align-items: center;

    }


}
</style>
