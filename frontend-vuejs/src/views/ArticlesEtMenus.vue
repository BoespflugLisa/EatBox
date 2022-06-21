<template>

    <div id="ArticlesEtMenus">

        <v-autocomplete
            v-model="model"
            :items="states"
            :readonly="isEditing"
            label="Chercher un article"
            persistent-hint
            prepend-icon="mdi-food"
        >
        </v-autocomplete>

        <h2> Mes articles</h2>

        <div class="mt-4">
            <v-btn class="mr-3 mb-3 font-40" rounded v-for="(item, index) in categories"
                   v-bind:key=index
                   v-bind:title=item>
                {{ item }}
            </v-btn>

            <v-dialog
                v-model="dialog"
                width="500"
            >

                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon size="30">mdi-plus-circle-outline</v-icon>

                    </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                        Créer une catégorie
                    </v-card-title>
                    <validation-observer ref="obs" v-slot="{ invalid, validated }">
                        <v-col
                            cols="12"
                            md="4"
                        >
                            <validation-provider name="Nom de la catégorie" rules="required|max:10"
                                                v-slot="{ errors, valid }">
                                <v-text-field
                                    v-model="categoryName"
                                    :counter="10"
                                    label="Nom de la catégorie"
                                    required
                                    :error-messages="errors"
                                    :success="valid"
                                ></v-text-field>
                            </validation-provider>

                        </v-col>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click="addCategorie()"
                                :disabled="invalid || !validated"
                                color="primary"
                                text
                            >
                                Valider
                            </v-btn>
                        </v-card-actions>
                    </validation-observer>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver, ValidationObserverInstance, ValidationProvider} from "vee-validate";

@Component({
    components: {
        ValidationObserver,
        ValidationProvider
    },
})

export default class ArticlesEtMenus extends Vue {

    isEditing = false
    model = null
    states = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    ]

    categories = ['Frites', 'Burger', 'Boissons']
    dialog = false
    categoryName = ''

    $refs!: {
        obs: ValidationObserverInstance
    }

    addCategorie(): void {
        this.$refs.obs.validate().then(success => {
            if (success) {
                this.categories.push(this.categoryName)
                this.dialog = false
                this.categoryName = ''
            }
        });

    }
}

</script>

