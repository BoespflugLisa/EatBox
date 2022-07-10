<template>
    <div id="profile-view" class="side-padding">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <livreur-infos ref="infos"/>
            </v-tab-item>
            <v-tab-item>
                <livreur-sponsorship/>
            </v-tab-item>
        </v-tabs>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LivreurInfos from "./LivreurInfos.vue";
import LivreurSponsorship from "./LivreurSponsorship.vue";


@Component({
    components: {
        LivreurInfos,
        LivreurSponsorship
    },
})

export default class ArticlesEtMenus extends Vue {
    $refs!: {
        infos: LivreurInfos,
    }

    deliverymanId = this.$cookies.get('user_id')

    tab = 0
    items = [
        {tab: "Info"},
        {tab: "Parrainage"},
    ]

    deliveryman = {}

    mounted() {
        this.getData()
        if (this.$route.query.tab === '1') {
            this.tab = 1;
        }
    }

    getData() {
        this.$axios.get("/users/deliverymen/" + this.deliverymanId)
            .then(response => {
                this.deliveryman = response.data.livreur
                this.$refs.infos.getData(response.data.livreur, this.deliverymanId)
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
