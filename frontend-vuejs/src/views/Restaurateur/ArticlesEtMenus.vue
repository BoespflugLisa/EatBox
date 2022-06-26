<template>

    <div class="side-padding" id="ArticlesEtMenus">
        <h1 class="mt-3"> Ma carte</h1>

        <v-autocomplete
            :items="Articles.map(({ nom }) => nom)"
            label="Chercher un article"
            persistent-hint
            prepend-icon="mdi-food"
        >
        </v-autocomplete>

        <h2 class="mt-3"> Mes catégories</h2>

        <div class="mt-4 d-flex">
            <v-chip-group
                column>
                <template
                    v-for="(category, index) in this.categories">
                    <v-chip
                        v-bind:key=index
                        v-bind:title=category
                        class="mr-3 mb-3 font-40" rounded
                        @click="openDialogUpdateCategory(category)">
                        {{ category.Name }}
                        <v-icon right>
                            mdi-pencil-remove
                        </v-icon>
                    </v-chip>
                </template>
            </v-chip-group>

            <div>
                <v-dialog
                    v-model="showDialogAddCategory"
                    width="500">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="mr-3 mt-2 mb-3"
                            icon
                            color="primary"
                            v-bind="attrs"
                            @click="showDialogAddCategory = true"
                            v-on="on">
                            <v-icon size="30">mdi-plus-circle-outline</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            Créer une catégorie
                        </v-card-title>
                        <v-card-text>
                            <validation-observer ref="obsAddCategory" v-slot="{ invalid, validated }">
                                <validation-provider name="Nom de la catégorie" rules="required|max:25"
                                                     v-slot="{ errors, valid }">
                                    <v-text-field
                                        v-model="category.Name"
                                        :counter="25"
                                        label="Nom de la catégorie"
                                        required
                                        :error-messages="errors"
                                        :success="valid">
                                    </v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            :disabled="invalid || !validated"
                                            @click="addCategory() "
                                            color="primary"
                                            text>
                                            Valider
                                        </v-btn>
                                    </v-card-actions>
                                </validation-provider>
                            </validation-observer>
                        </v-card-text>
                        <v-divider></v-divider>

                    </v-card>
                </v-dialog>
            </div>

        </div>

        <v-dialog
            v-model="showDialogUpdateAndDeleteCategory"
            width="500">
            <v-card>
                <v-card-title>
                    Modifier la catégorie
                </v-card-title>
                <v-card-text>
                    <validation-observer ref="obsUpdateCategory">
                        <validation-provider name="Nom de la catégorie" rules="required|max:25" v-slot="{ errors, valid }">
                            <v-text-field
                                v-model="editedCategory.Name"
                                :counter="25"
                                label="Nom de la catégorie"
                                :error-messages="errors"
                                :success="valid"
                            ></v-text-field>
                        </validation-provider>
                    </validation-observer>


                </v-card-text>
                <v-card-actions>
                    <v-btn
                        @click="showDialogUpdateAndDeleteCategory = false"
                        color="primary"
                        text>
                        Retour
                    </v-btn>

                    <v-btn
                        @click="updateCategory()"
                        color="primary"
                        text >
                        Mettre à jour
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="deleteCategory(editedCategory)"
                        color="primary"
                        text>
                        Supprimer
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>



        <h2 class="mt-3"> Mes articles</h2>
        <div class=" d-flex flex-wrap">
            <v-card
                class="ml-2 mt-5 ml-2 "
                max-width="160px"
                v-for="(article, index) in this.articles"
                v-bind:key=index
                v-bind:src=article
                @click="openDialogUpdateArticle(article)"
            >
                <v-card-text>
                    <v-img
                        rounded
                        width="200px"
                        height="100px"
                        :src=article.ArticleImg
                    ></v-img>

                    <div class="ma-2 align-self text-center">
                        <p class="ma-auto align-content-center text-center">{{ article.Name }}</p>
                    </div>
                </v-card-text>

            </v-card>

            <v-dialog
                v-model="showDialogUpdateAndDeleteArticle"
                width="500">
                <v-card>
                    <v-card-title>
                        Modifier l'article
                    </v-card-title>
                    <validation-observer ref="obsUpdateArticle">
                        <v-card-text>
                            <validation-provider name="Nom de l'article" rules="required|max:30"
                                                 v-slot="{ errors, valid }">
                                <v-text-field
                                    prepend-icon="mdi-food"
                                    v-model="editedArticle.Name"
                                    :counter="25"
                                    label="Nom de l'article"
                                    :error-messages="errors"
                                    :success="valid"
                                ></v-text-field>
                            </validation-provider>
                            <validation-provider name="Description de l'article" rules="required|max:140"
                                                 v-slot="{ errors, valid }">
                                <v-text-field
                                    prepend-icon="mdi-image-text"
                                    v-model="editedArticle.Description"
                                    :counter="140"
                                    label="Description de l'article"
                                    :error-messages="errors"
                                    :success="valid">
                                </v-text-field>
                            </validation-provider>

                            <v-autocomplete
                                :items="categories.map(({ Name }) => Name)"
                                label="Catégorie"
                                persistent-hint>
                            </v-autocomplete>

                            <validation-provider name="Prix de l'article" rules="required|max:500|min:0">
                                <v-text-field
                                    prepend-icon="mdi-currency-eur"
                                    v-model="editedArticle.Price"
                                    label="Prix de l'article"
                                    type="number"
                                ></v-text-field>
                            </validation-provider>

                            <v-file-input
                                v-model="editedArticleImg"
                                show-size
                                label="Photo de l'article"
                                prepend-icon="mdi-image"
                                @change="uploadArticleImg()"
                                truncate-length="15"
                                accept="image/*">
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

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn
                                    @click="showDialogUpdateAndDeleteArticle = false"
                                    color="primary"
                                    text>
                                    Retour
                                </v-btn>
                                <v-btn
                                    @click=" updateArticle()"
                                    color="primary"
                                    text>
                                    Valider
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="deleteArticle(editedArticle)"
                                    color="primary"
                                    text>
                                    Supprimer
                                </v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </validation-observer>
                </v-card>
            </v-dialog>



<!--            <v-dialog
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
            </v-dialog>-->


        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver, ValidationProvider} from "vee-validate";

@Component({
    components: {
        ValidationObserver,
        ValidationProvider,
    },
})

export default class ArticlesEtMenus extends Vue {

    categories = [];
    articles = [];
    menus = [];
    category = {};
    editedCategory = {};
    editedCategoryId = "";
    selectedCategory = {};

    editedArticle = {
        ArticleImg: "",
    };
    editedArticleId = "";
    editedArticleImg = null;
    resultArticleImg: ArrayBuffer | string | null = null;

    showDialogUpdateAndDeleteCategory = false;
    showDialogUpdateAndDeleteArticle = false;

    showDialogAddCategory = false;
    showDialogAddArticle = false;

    restaurantId = this.$cookies.get('restaurant_id');

    $refs!: {
        obsAddCategory: InstanceType<typeof ValidationObserver>
        obsUpdateCategory: InstanceType<typeof ValidationObserver>

        obsAddArticle: InstanceType<typeof ValidationObserver>
        obsUpdateArticle: InstanceType<typeof ValidationObserver>

        obsAddMenu: InstanceType<typeof ValidationObserver>
        obsUpdateMenu: InstanceType<typeof ValidationObserver>
    }

    mounted() {
        Promise.all([this.getAllCategories(), this.getAllArticles(), this.getAllMenus()])
            .then()
    }

    getAllCategories() {
        return this.$axios.get(`categories`)
            .then(response => {
                this.categories = response.data.categories;
            })
    }

    getAllArticles() {
        return this.$axios.get(`articles`)
            .then(response => {
                this.articles = response.data.articles;
            })
    }

    getAllMenus() {
        return this.$axios.get(`menus`)
            .then(response => {
                this.menus = response.data.menus;
            })
    }

    openDialogUpdateArticle(article) {
        this.editedArticle = JSON.parse(JSON.stringify(article));
        this.editedArticleId = article._id;
        this.showDialogUpdateAndDeleteArticle = true;
    }

   /* openDialogAddCategory(){
        console.log(this.category);
        this.category = {};
        console.log(this.category);
    }*/

    openDialogUpdateCategory(category) {
        this.editedCategory = JSON.parse(JSON.stringify(category));
        this.editedCategoryId = category._id;
        this.showDialogUpdateAndDeleteCategory = true;
    }

    addCategory() {
        this.$refs.obsAddCategory.validate().then(success => {
            if (success) {
                this.$axios.post(`categories/` + this.restaurantId, {data: this.category}).then(() => {
                    this.getAllCategories();
                }).finally(() => {
                    this.showDialogAddCategory = false;
                })
            }
        });
    }

    updateArticle() {
        this.$refs.obsUpdateArticle.validate().then(success => {
            if (success) {
                if (this.resultArticleImg !== null){
                    this.editedArticle.ArticleImg = this.resultArticleImg.toString();
                }
                this.$axios.put(`articles/` + this.editedArticleId, {data: this.editedArticle}).then(() => {
                    this.getAllArticles();
                }).finally(() => {
                    this.showDialogUpdateAndDeleteArticle = false;
                })
            }
        });
    }

    updateCategory() {
        this.$refs.obsUpdateCategory.validate().then(success => {
            if (success) {
                this.$axios.put(`categories/` + this.editedCategoryId, {data: this.editedCategory}).then(() => {
                    this.getAllCategories();
                }).finally(() => {
                    this.showDialogUpdateAndDeleteCategory = false;
                })
            }
        });
    }

    deleteArticle(article) {
        this.$axios.delete(`articles/` + article._id, {data: article}).then(() => {
            this.getAllArticles();
        }).finally(() => {
            this.showDialogUpdateAndDeleteArticle = false;
        });
    }

    deleteCategory(category) {
        this.$axios.delete(`categories/` + category._id, {data: category}).then(() => {
            this.getAllCategories();
        }).finally(() => {
            this.showDialogUpdateAndDeleteCategory = false;
        });
    }

    uploadArticleImg() {
        if (this.editedArticleImg !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.resultArticleImg = reader.result;
            }
            reader.readAsDataURL(this.editedArticleImg)
        }
        else {
            this.resultArticleImg = null;
        }
    }



    Articles = [
        {
            nom: "Frites douces",
            id: 0,
            itemPrix: 0,
            itemDesc: "fries",
            image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            state: false
        },
        {
            nom: "Chips",
            id: 0,
            itemPrix: 0,
            itemDesc: "f",
            image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            state: false
        },
        {
            nom: "Basique",
            id: 0,
            itemPrix: 0,
            itemDesc: "fds",
            image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            state: false
        }
    ]

    dialogCategorie = false
    dialogArticle = false
    dialogUpdateCartegory = false
    categoryName = ''
    tempImage: any = null
    itemName = ''
    itemPrix = 0
    categoryToUpdate = ''
    itemDesc = ''
    showArtileEdit = false




    /*addCategorie(): void {
        this.$refs.obs.validate().then(success => {
            if (success) {
                this.categories.push({nom: this.categoryName, id: 2342, open: true})
                this.dialogCategorie = false
                this.categoryName = ''
            }
        });
    }*/

    /*categories = [];[
        {nom: "Frites", id: 0, open: true,},
        {nom: "Burger", id: 0, open: true,},
        {nom: "Boissons", id: 0, open: true,}
    ]*/

    /*close(category): void {
        category.open = false
        this.dialogUpdateCartegory = false
    }*/


    /*addItem(): void {
        this.$refs.obsArticle.validate().then(success => {
            if (success) {
                this.tempImage = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
                this.Articles.push({
                    nom: this.itemName,
                    id: 0,
                    itemPrix: this.itemPrix,
                    itemDesc: this.itemDesc,
                    image: this.tempImage,
                    state: false
                })
                this.tempImage = ''
                this.dialogArticle = false
            }

        });
    }*/
}

</script>


