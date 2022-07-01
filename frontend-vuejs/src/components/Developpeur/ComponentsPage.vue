<template>
    <div id="components-page">

        <h1 class="mt-3">Liste des composants disponibles</h1>

        <div class="mt-3" v-for="component in this.components" :key="component._id">
            <v-card class="d-flex justify-space-between">
                <div>
                    <v-card-title>
                        {{ component.Name}}
                    </v-card-title>
                    <v-card-text class="font-14">
                        {{component.tipInstallation}}
                    </v-card-text>
                </div>
                <v-card-actions class="mr-3">
                    <v-btn @click="showDetails(component)" rounded color="secondary">
                        Détails
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>

    </div>



</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {
    },
})

export default class ComponentsPage extends Vue{
    name = "ComponentsPage"

    components = [{
        _id: "526z5fev5645645",
        Name: "listing des restaurants",
    }]


}
</script>

<style scoped>

</style>
