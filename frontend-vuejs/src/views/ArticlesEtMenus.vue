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
                    <v-form ref="categorieForm" lazy-validation>
                        <v-col
                          cols="12"
                          md="4"
                        >

                            <v-text-field
                              v-model="categoryName"
                              :counter="10"
                              :rules="maxCharac"
                              label="Nom de la catégorie"
                              required
                            ></v-text-field>

                        </v-col>


                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              :disabled="!addCategorie"
                              @click="addCategorie()"

                            >
                                Valider
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {},
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
    valid= true


    maxCharac = [
        v => !!v || 'Un nom est requis',
        v => (v && v.length <= 10 ) || 'Le nom doit comporter moins de 10 characters',
    ]



    addCategorie() {

            this.categories.push(this.categoryName)
            this.dialog = false
            this.categoryName = ''
    }


}

</script>

