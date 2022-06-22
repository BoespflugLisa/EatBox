<template>
    <div id="restaurant-information" class="side-padding">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <restaurant-infos/>
            </v-tab-item>
            <v-tab-item>
                <restaurant-pref/>
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

export default class ArticlesEtMenus extends Vue {

    tab = 0
    items = [
        {tab: "Info"},
        {tab: "Préférences"},
        {tab: "Parrainage"},
    ]






    created() {
        if (this.$route.query.tab === '2') {
            this.tab = 2;
        }
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