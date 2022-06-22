<template>
    <div id="select-schedule">
        <v-btn color="secondary" @click="openDialog()">
            Lundi
        </v-btn>

        <v-dialog
            v-model="showDialog"
        >
            <v-card>
                <v-card-title>
                    Renseignez vos horraire
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-menu
                            ref="startHour"
                            v-model="menuStart"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="startHour"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="startHour"
                                    label="Heure d'ouverture"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuStart"
                                v-model="startHour"
                                full-width format="24hr"
                                :max="endHour"
                                @click:minute="$refs.startHour.save(startHour)"
                            ></v-time-picker>
                        </v-menu>

                        <v-spacer/>

                        <v-menu
                            ref="endHour"
                            v-model="menuEnd"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="endHour"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="endHour"
                                    label="Heure de fermeture"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuEnd"
                                v-model="endHour"
                                full-width format="24hr"
                                :min="startHour"
                                @click:minute="$refs.endHour.save(endHour)"
                            ></v-time-picker>
                        </v-menu>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="js">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class SelectSchedule extends Vue {
    showDialog = false;
    menuStart = false
    menuEnd = false
    startHour = null;
    endHour = null;

    openDialog() {
        this.showDialog = true;
    }
}
</script>

<style scoped>

</style>