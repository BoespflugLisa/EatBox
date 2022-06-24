<template>
    <div id="restaurant-information" class="side-padding">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <livreur-infos/>
            </v-tab-item>
            <v-tab-item>
                <livreur-pref/>
            </v-tab-item>
            <v-tab-item>
                <livreur-sponsorship/>
            </v-tab-item>
        </v-tabs>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LivreurInfos from "../components/Livreur/LivreurInfos.vue";
import LivreurPref from "../components/Livreur/LivreurPref.vue";
import LivreurSponsorship from "../components/Livreur/LivreurSponsorship.vue";


@Component({
    components: {
        LivreurInfos,
        LivreurPref,
        LivreurSponsorship
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