<template>

    <div class="side-padding" id="ArticlesEtMenus">

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
            <v-chip-group
            column>
                <v-chip close @click:close="chip1= false" class="mr-3 mb-3 font-40" rounded v-for="(item, index) in categories"
                        v-bind:key=index
                        v-bind:title=item
                >

                    {{ item }}

                </v-chip>
            </v-chip-group>


            <v-dialog
              v-model="dialogCategorie"
              width="500"
            >

                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mr-3 mb-3"
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
                            <validation-provider name="Nom de la catégorie" rules="required|max:25"
                                                 v-slot="{ errors, valid }">
                                <v-text-field
                                  v-model="categoryName"
                                  :counter="25"
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


            <div class=" d-flex flex-wrap">
                <v-card

                  class="ml-2 mt-5 ml-2 "
                  max-width="160px"
                  v-for="(item, index) in imagesArticle"
                  v-bind:key=index
                  v-bind:src=item>
                    <v-img
                      rounded
                      width="200px"
                      height="100px"
                      v-bind:src=item
                    ></v-img>


                    <div class="ma-2 align-self text-center">
                        <p class="ma-auto align-content-center text-center">{{ titleArticle[index] }}</p>
                    </div>
                </v-card>


                <v-dialog
                  v-model="dialogArticle"
                  width="500"
                >

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          color="primary"
                          class="ma-16 d-flex justify-center"
                          x-large
                          v-bind="attrs"
                          v-on="on"
                        >
                            <v-icon size="70">mdi-plus</v-icon>

                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            Créer un article
                        </v-card-title>
                        <validation-observer ref="obsArticle" v-slot="{ invalid, validated }">
                            <v-col
                              cols="12"
                              md="4"
                            >
                                <validation-provider name="Nom de l'article" rules="required|max:30"
                                                     v-slot="{ errors, valid }">
                                    <v-text-field
                                      v-model="itemName"
                                      :counter="25"
                                      label="Nom de l'article"
                                      required
                                      :error-messages="errors"
                                      :success="valid"
                                    ></v-text-field>
                                </validation-provider>


                                <template>
                                    <v-file-input
                                      v-model="tempImage"
                                      placeholder="Télécharger une image"
                                      label="Télécharger une image"
                                      multiple
                                      prepend-icon="mdi-paperclip"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip
                                              small
                                              label
                                              color="primary"
                                            >
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </template>

                            </v-col>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click=" addItem() "
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
    titleArticle = ['Frites patate douce maison', ' Chips', 'Frites basiques', 'Boissons', 'Boissons']
    imagesArticle = ['https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg']
    dialogCategorie = false
    dialogArticle = false
    categoryName = ''
    tempImage: Array<unknown> = []
    itemName = ''
    $refs!: {
        obs: ValidationObserverInstance
        obsArticle: ValidationObserverInstance
    }


    addCategorie(): void {
        this.$refs.obs.validate().then(success => {
            if (success) {
                this.categories.push(this.categoryName)
                this.dialogCategorie = false
                this.categoryName = ''
            }
        });
    }

    addItem(): void {
        this.$refs.obsArticle.validate().then(success => {
            if (success) {
                this.tempImage.push(this.imagesArticle)
                console.log(this.tempImage)
                this.tempImage = []
                this.titleArticle.push(this.itemName)
                this.dialogArticle = false
                this.itemName = ''
            }
            console.log(this.imagesArticle)
        });
    }
}

</script>


