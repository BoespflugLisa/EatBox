<template>
    <div id="developer" class="side-padding">
        <v-tabs fixed-tabs>
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            <v-tab-item>
                <home-page ref="infosProfil"/>
            </v-tab-item>
            <v-tab-item>
                <components-page/>
            </v-tab-item>
        </v-tabs>
    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HomePage from "../../components/Developpeur/HomePage.vue";
import ComponentsPage from "../../components/Developpeur/ComponentsPage.vue";

@Component({
    components: {
        HomePage,
        ComponentsPage
    },
})

export default class DeveloperHomepage extends Vue{
    name = 'DeveloperHomepage'

    items = [
        {tab: "Profil"},
        {tab: "Composants téléchargeables"},
    ]
}
</script>

<style scoped>

</style>
