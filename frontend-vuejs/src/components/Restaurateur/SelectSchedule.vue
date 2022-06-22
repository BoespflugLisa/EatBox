<template>
    <div id="select-schedule">
        <v-btn color="tertiary" @click="openDialog('monday')">
            Lundi
        </v-btn>

        <v-dialog
            v-model="showDialog"
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    Renseignez vos horraire
                </v-card-title>
                <v-card-text>
                    <v-switch
                        v-model="schedule.isOpen"
                        :label="schedule.isOpen ? 'Vous êtes ouvert ce jour' : 'Vous êtes fermé ce jour'"
                        @change="checkIfFormIsValid()"
                    />
                    <div v-if="schedule.isOpen">
                        <v-row>
                            <v-menu
                                ref="startHour"
                                v-model="menuStart"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="schedule.startHour"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="schedule.startHour"
                                        label="Heure d'ouverture"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuStart"
                                    v-model="schedule.startHour"
                                    full-width format="24hr"
                                    :max="schedule.endHour"
                                    @click:minute="$refs.startHour.save(schedule.startHour)"
                                    @change="checkIfFormIsValid()"
                                ></v-time-picker>
                            </v-menu>

                            <v-spacer/>

                            <v-menu
                                ref="endHour"
                                v-model="menuEnd"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="schedule.endHour"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="schedule.endHour"
                                        label="Heure de fermeture"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuEnd"
                                    v-model="schedule.endHour"
                                    full-width format="24hr"
                                    :min="schedule.startHour"
                                    @click:minute="$refs.endHour.save(schedule.endHour)"
                                    @change="checkIfFormIsValid()"
                                ></v-time-picker>
                            </v-menu>
                        </v-row>
                        <v-checkbox
                            v-model="schedule.isSecondTimeRange"
                            label="Ouvrir pendant une deuxième plage horraire"
                            @change="checkIfFormIsValid()"
                        />
                        <v-row v-if="schedule.isSecondTimeRange">
                            <v-menu
                                ref="startHour2"
                                v-model="menuStart2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="schedule.startHour2"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="schedule.startHour2"
                                        label="Heure d'ouverture"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuStart2"
                                    v-model="schedule.startHour2"
                                    full-width format="24hr"
                                    :min="schedule.endHour"
                                    :max="schedule.endHour2"
                                    @click:minute="$refs.startHour2.save(schedule.startHour2)"
                                    @change="checkIfFormIsValid()"
                                ></v-time-picker>
                            </v-menu>

                            <v-spacer/>

                            <v-menu
                                ref="endHour2"
                                v-model="menuEnd2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="schedule.endHour2"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="schedule.endHour2"
                                        label="Heure de fermeture"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuEnd2"
                                    v-model="schedule.endHour2"
                                    full-width format="24hr"
                                    :min="schedule.startHour2"
                                    @click:minute="$refs.endHour2.save(schedule.endHour2)"
                                    @change="checkIfFormIsValid()"
                                ></v-time-picker>
                            </v-menu>
                        </v-row>
                    </div>
                </v-card-text>
                <v-divider/>
                <v-card-actions class="">
                    <v-spacer/>
                    <v-btn
                        text
                        color="secondary"
                        :disabled="!formIsValid"
                        @click="updateForm()"
                    >
                        Valider
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
})

export default class SelectSchedule extends Vue {
    showDialog = false;
    editedDay = "";

    hours = {
        monday: {
            isOpen: false,
            isSecondTimeRange: false,
            startHour: null,
            endHour: null,
            startHour2: null,
            endHour2: null,
        },
        tuesday: {
            isOpen: false,
            isSecondTimeRange: false,
            startHour: null,
            endHour: null,
            startHour2: null,
            endHour2: null,
        },
        wednesday: {
            isOpen: false,
            isSecondTimeRange: false,
            startHour: null,
            endHour: null,
            startHour2: null,
            endHour2: null,
        },
        thursday: {
            isOpen: false,
            isSecondTimeRange: false,
            startHour: null,
            endHour: null,
            startHour2: null,
            endHour2: null,
        },
        friday: {
            isOpen: false,
            isSecondTimeRange: false,
            startHour: null,
            endHour: null,
            startHour2: null,
            endHour2: null,
        },
        saturday: {
            isOpen: false,
            isSecondTimeRange: false,
            startHour: null,
            endHour: null,
            startHour2: null,
            endHour2: null,
        },
        sunday: {
            isOpen: false,
            isSecondTimeRange: false,
            startHour: null,
            endHour: null,
            startHour2: null,
            endHour2: null,
        }
    }

    schedule = {
        isOpen: false,
        isSecondTimeRange: false,
        startHour: null,
        endHour: null,
        startHour2: null,
        endHour2: null,
    }



    menuStart = false
    menuEnd = false

    menuStart2 = false
    menuEnd2 = false

    formIsValid = false

    openDialog(editedDay) {
        this.editedDay = editedDay;
        this.schedule = this.hours[this.editedDay]

        this.checkIfFormIsValid();

        this.showDialog = true;
    }

    checkIfFormIsValid() {
        if (!this.schedule.isOpen) {
            this.formIsValid = true;
        } else if (!this.schedule.isSecondTimeRange && this.schedule.startHour !== null && this.schedule.endHour !== null) {
            this.formIsValid = true;
        } else if (this.schedule.startHour !== null && this.schedule.endHour !== null && this.schedule.startHour2 !== null && this.schedule.endHour2 !== null) {
            this.formIsValid = true;
        } else {
            this.formIsValid = false;
        }
    }

    updateForm() {
        console.log('test')
    }
}
</script>

<style scoped>

</style>