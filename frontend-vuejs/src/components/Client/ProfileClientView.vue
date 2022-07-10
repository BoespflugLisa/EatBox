<template>
    <div id="profile-client-view" class="side-padding">
        <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <client-infos ref="infos"/>
            </v-tab-item>
            <v-tab-item>
                <client-sponsorship/>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ClientInfos from './ClientInfos.vue'
import ClientSponsorship from './ClientSponsorship.vue'

@Component({
    components: {
        ClientInfos,
        ClientSponsorship
    },
})

export default class ProfileClientView extends Vue {
    $refs!: {
        infos: ClientInfos,
    }

    clientId = this.$cookies.get('user_id')

    client = {}

    tab = 0
    items = [
        {tab: "Info"},
        {tab: "Parrainage"},
    ]

    mounted() {
        this.getData()
        if (this.$route.query.tab === '1') {
            this.tab = 1;
        }
    }

    getData() {
        this.$axios.get("/users/clients/" + this.clientId)
            .then(response => {
                this.client = response.data.client;
                this.$refs.infos.getData(response.data.client, this.clientId);
            })
    }
}
</script>

<style scoped>

</style>