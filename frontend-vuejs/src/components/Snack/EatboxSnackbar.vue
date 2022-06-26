<template>
    <div id="eatbox-snackbar">
        <v-snackbar v-model="show" :color="color" timeout="4000">
            {{ message }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    @click="show = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
    components: {},
})

export default class EatboxSnackbar extends Vue {
    show = false;
    message = "";
    color = "";

    openSnackbar(message, color) {
        this.message = message;
        this.color = color;
        this.show = true;
    }
}
</script>

<style scoped>

</style>