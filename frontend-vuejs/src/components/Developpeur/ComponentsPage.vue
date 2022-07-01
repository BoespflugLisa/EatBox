<template>
    <div id="components-page">

        <h1 class="mt-3">Liste des composants disponibles</h1>

        <div class="ma-3" v-for="component in this.components" :key="component._id">
            <v-card>
                    <v-card-title>
                        {{ component.name }}
                    </v-card-title>
                    <v-card-text class="font-14">
                        {{ component.tipInstallation }}
                        <p class="code-template mt-1">{{component.installCommand}}</p>
                    </v-card-text>
            </v-card>
        </div>

    </div>


</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class ComponentsPage extends Vue {
    name = "ComponentsPage"

    components = [{
        _id: "526z5f58d8ev5645645",
        name: "Restaurants",
        tipInstallation: "Recupération de la liste des restaurants",
        installCommand: "npm install eatbox-restaurants-list"
    },
        {
            _id: "526ldlded85v5645645",
            name: "Menus",
            tipInstallation: "Recupération des menus par restaurant",
            installCommand: "npm install  eatbox-menus-by-restaurant-list"
        },
        {
            _id: "526ldld5ed85v8dok7d",
            name: "Articles",
            tipInstallation: "Recupération des articles par restaurant",
            installCommand: "npm install  eatbox-articles-by-restaurant-list"
        },
    ]


}
</script>

<style scoped>

.code-template{
    width: 100%;
    background-color: #f7f8ff;
    font-family: monospace;
    padding: 2%;
    color: darkblue;

}

</style>
