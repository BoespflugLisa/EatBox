<template>
    <div id="select-schedule">


        <v-data-table
            :headers="headers"
            :items="days"
            :hide-default-footer="true"
        >
            <template v-slot:[`item.schedule`]="{ item }">
                {{ displaySchedule(item.day) }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    @click="openDialog(item.day)"
                >
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>


        <v-dialog
            v-model="showDialog"
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    Renseignez vos horaire
                </v-card-title>
                <v-card-text>
                    <validation-observer ref="obs">
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
                                        <validation-provider name="Heure d'ouverture" rules="required"
                                                             v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="schedule.startHour"
                                                label="Heure d'ouverture"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :error-messages="errors"
                                                :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
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
                                        <validation-provider name="Heure de fermeture" rules="required"
                                                             v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="schedule.endHour"
                                                label="Heure de fermeture"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :error-messages="errors"
                                                :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
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
                                        <validation-provider name="Heure d'ouverture" rules="required"
                                                             v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="schedule.startHour2"
                                                label="Heure d'ouverture"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :error-messages="errors"
                                                :success="valid"
                                            ></v-text-field>
                                        </validation-provider>

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
                                        <validation-provider name="Heure de fermeture" rules="required"
                                                             v-slot="{ errors, valid }">
                                            <v-text-field
                                                v-model="schedule.endHour2"
                                                label="Heure de fermeture"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :error-messages="errors"
                                                :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
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
                    </validation-observer>
                </v-card-text>
                <v-divider/>
                <v-card-actions class="">
                    <v-spacer/>
                    <v-btn
                        text
                        color="secondary"
                        :disabled="!formIsValid"
                        @click="validHours()"
                    >
                        Valider
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ValidationObserver, ValidationObserverInstance, ValidationProvider} from "vee-validate";

@Component({
    components: {
        ValidationObserver,
        ValidationProvider
    },
})

export default class SelectSchedule extends Vue {
    showDialog = false;
    editedDay = "";

    headers = [
        {text: 'Jour', value: 'jour', sortable: false, width: '20%'},
        {text: 'Horaire', value: 'schedule', sortable: false},
        {text: 'Actions', value: 'actions', sortable: false, width: '20%'}
    ]

    days = [
        {
            jour: "Lundi",
            day: "monday"
        },
        {
            jour: "Mardi",
            day: "tuesday"
        },
        {
            jour: "Mercredi",
            day: "wednesday"
        },
        {
            jour: "Jeudi",
            day: "thursday"
        },
        {
            jour: "Vendredi",
            day: "friday"
        },
        {
            jour: "Samedi",
            day: "saturday"
        },
        {
            jour: "Dimanche",
            day: "sunday"
        },
    ]

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

    $refs!: {
        obs: ValidationObserverInstance
    }

    test(item) {
        console.log(item.day)
    }

    displaySchedule(day) {
        if (!this.hours[day].isOpen) {
            return "Fermé";
        } else if (this.hours[day].startHour2 === null && this.hours[day].endHour2 === null && !this.hours[day].isSecondTimeRange) {
            return this.hours[day].startHour + " - " + this.hours[day].endHour;
        }
        return this.hours[day].startHour + " - " + this.hours[day].endHour + " / " + this.hours[day].startHour2 + " - " + this.hours[day].endHour2;

    }

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

    validHours() {
        this.$refs.obs.validate().then(success => {
            if (success) {
                this.hours[this.editedDay] = this.schedule;
                this.editedDay = "";
                this.showDialog = false;
            }
        });
    }
}
</script>

<style scoped>

</style>