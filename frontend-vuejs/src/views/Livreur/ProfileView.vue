<template>
    <div id="profile-view" class="side-padding">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <livreur-infos ref="infos"/>
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
import LivreurInfos from "../../components/Livreur/LivreurInfos.vue";
import LivreurPref from "../../components/Livreur/LivreurPref.vue";
import LivreurSponsorship from "../../components/Livreur/LivreurSponsorship.vue";


@Component({
    components: {
        LivreurInfos,
        LivreurPref,
        LivreurSponsorship
    },
})

export default class ArticlesEtMenus extends Vue {
    $refs!: {
        infos: LivreurInfos,
    }

    deliverymanId = "62b84d664efef62b653708de"/*this.$cookies.get('deliveryman_id')*/

    tab = 0
    items = [
        {tab: "Info"},
        {tab: "Préférences"},
        {tab: "Parrainage"},
    ]

    deliveryman = {}

    mounted() {
        this.getData()
        if (this.$route.query.tab === '2') {
            this.tab = 2;
        }
    }

    getData() {
        this.$axios.get("/deliverymans/" + this.deliverymanId)
            .then(response => {
                this.deliveryman = response.data.deliveryman
                this.$refs.infos.getData(response.data.deliveryman, this.deliverymanId)
            })
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