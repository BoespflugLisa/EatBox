<template>

    <div class="side-padding" id="ArticlesEtMenus">

        <v-autocomplete
          v-model="model"
          :items="Articles.map(({ nom }) => nom)"
          :readonly="isEditing"
          label="Chercher un article"
          persistent-hint
          prepend-icon="mdi-food"
        >
        </v-autocomplete>

        <h2> Mes articles</h2>

        <div class="mt-4 ">
            <v-chip-group
              column>
                <template
                  v-for="(item, index) in categories">
                    <v-chip
                      v-bind:key=index
                      v-bind:title=item
                      close
                      @click:close="deletePopUp(item)"

                      class="mr-3 mb-3 font-40" rounded
                      v-if="item.open"
                    >

                        {{ item.nom }}

                    </v-chip>
                </template>
            </v-chip-group>



            <v-dialog
              v-model="dialogDelete"
              width="300"
              v-if="dialogDelete"
            >
                <v-card  class="text-end">
                    <v-card-title>
                        Supprimer une catégorie ?
                    </v-card-title>

                    <v-btn

                      @click=" close(itemtemtem)"
                      color="primary"
                      text
                    >
                        Valider
                    </v-btn>
                    <v-btn

                      @click=" dialogDelete =false"
                      color="primary"
                      text
                    >
                        Retour
                    </v-btn>


                </v-card>

            </v-dialog>

            <v-dialog
              v-model="dialogCategorie"
              width="500"
            >


                <template  v-slot:activator="{ on, attrs }">
                    <div class="d-flex ">
                    <v-btn
                      class="mr-3 mb-3"
                      icon
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                        <v-icon size="30">mdi-plus-circle-outline</v-icon>

                    </v-btn>
                        <p class="mt-1">Ajouter une catégorie</p>
                    </div>
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
                              :disabled="invalid || !validated"
                              @click="addCategorie() "
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
                  v-for="(item, index) in Articles"
                  v-bind:key=index
                  v-bind:src=item
                  @click="item.state=true"
               >
                    <v-img
                      rounded
                      width="200px"
                      height="100px"
                      v-bind:src=item.image
                    ></v-img>


                    <div class="ma-2 align-self text-center">
                        <p class="ma-auto align-content-center text-center">{{ item.nom }}</p>
                    </div>
                </v-card>





<template   v-for="(item, index) in Articles"

>
                <v-dialog
                  v-model="item.state"
                  width="500"
                  v-if="item.state"
                  v-bind:key=index
                  v-bind:src=item
                >
                    <v-card>
                        <v-card-title>
                            Modifier l'article
                        </v-card-title>
                        <validation-observer ref="obsArticle" v-slot="{ invalid, validated }">
                            <v-col
                              cols="12"
                              md="4"
                            >

                                <validation-provider name="Nom de l'article" rules="required|max:30"
                                                     v-slot="{ errors, valid }">
                                    <v-text-field
                                      prepend-icon="mdi-food"
                                      v-model="item.nom"
                                      :counter="25"
                                      label="Nom de l'article"
                                      required
                                      :error-messages="errors"
                                      :success="valid"
                                    ></v-text-field>
                                </validation-provider>


                                <validation-provider name="Description de l'article" rules="required|max:140"
                                                     v-slot="{ errors, valid }">
                                    <v-text-field
                                      prepend-icon="mdi-image-text"
                                      v-model="item.itemDesc"
                                      :counter="140"
                                      label="Description de l'article"
                                      required
                                      :error-messages="errors"
                                      :success="valid"
                                    ></v-text-field>
                                </validation-provider>

                                <v-autocomplete
                                  v-model="model"
                                  prepend-icon="mdi-folder-open"
                                  :items="categories.map(({ nom }) => nom)"
                                  :readonly="isEditing"
                                  label="Ajouter à une catégorie"
                                  persistent-hint

                                >
                                </v-autocomplete>

                                <validation-provider name="Prix de l'article"
                                >
                                    <v-text-field
                                      prepend-icon="mdi-currency-eur"
                                      v-model="item.itemPrix"
                                      label="Prix de l'article"
                                      required
                                      type="number"
                                      min="0" max="500"
                                    ></v-text-field>
                                </validation-provider>

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


</template>




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
                                      prepend-icon="mdi-food"
                                      v-model="itemName"
                                      :counter="25"
                                      label="Nom de l'article"
                                      required
                                      :error-messages="errors"
                                      :success="valid"
                                    ></v-text-field>
                                </validation-provider>


                                <validation-provider name="Description de l'article" rules="required|max:140"
                                                     v-slot="{ errors, valid }">
                                    <v-text-field
                                      prepend-icon="mdi-image-text"
                                      v-model="itemDesc"
                                      :counter="140"
                                      label="Description de l'article"
                                      required
                                      :error-messages="errors"
                                      :success="valid"
                                    ></v-text-field>
                                </validation-provider>

                                <v-autocomplete
                                  v-model="model"
                                  prepend-icon="mdi-folder-open"
                                  :items="categories.map(({ nom }) => nom)"
                                  :readonly="isEditing"
                                  label="Ajouter à une catégorie"
                                  persistent-hint

                                >
                                </v-autocomplete>

                                <validation-provider name="Prix de l'article"
                                >
                                    <v-text-field
                                      prepend-icon="mdi-currency-eur"
                                      v-model="itemPrix"
                                      label="Prix de l'article"
                                      required
                                      type="number"
                                      min="0" max="500"
                                    ></v-text-field>
                                </validation-provider>

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

    Articles = [
        {nom: "Frites douces", id: 0, itemPrix: 0, itemDesc:"fries",image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",state:false},
        {nom: "Chips", id: 0, itemPrix: 0,itemDesc:"f",image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",state:false},
        {nom: "Basique", id: 0, itemPrix: 0,itemDesc:"fds",image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",state:false}
    ]

    dialogCategorie = false
    dialogArticle = false
    dialogDelete = false
    categoryName = ''
    tempImage: any = null
    itemName = ''
    itemPrix = 0
    itemtemtem = ''
    itemDesc = ''

    $refs!: {
        obs: ValidationObserverInstance
        obsArticle: ValidationObserverInstance
    }

deletePopUp(item) {
    this.dialogDelete =true
    this.itemtemtem = item
}

    addCategorie(): void {
        this.$refs.obs.validate().then(success => {
            if (success) {
                this.categories.push({nom: this.categoryName, id: 2342, open: true})
                this.dialogCategorie = false
                this.categoryName = ''
            }
        });
    }

    categories = [
        {nom: "Frites", id: 0, open: true,},
        {nom: "Burger", id: 0, open: true,},
        {nom: "Boissons", id: 0, open: true,}
    ]

    close(itemtemtem): void{
        itemtemtem.open=false
        this.dialogDelete = false
    }


    addItem(): void {
        this.$refs.obsArticle.validate().then(success => {
            if (success) {
                this.tempImage = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
                this.Articles.push({nom: this.itemName, id: 0, itemPrix: this.itemPrix, itemDesc: this.itemDesc,image: this.tempImage, state:false})
                this.tempImage = ''
                this.dialogArticle = false
            }

        });
    }
}

</script>


