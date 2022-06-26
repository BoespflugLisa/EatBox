<template>

    <div class="side-padding" id="ArticlesEtMenus">
        <h1 class="mt-3"> Ma carte</h1>
        <div class="d-flex">
            <v-autocomplete
                v-model="searchArticles"
                :items="categories"
                item-text="Name"
                label="Trier les articles par catégorie"
                persistent-hint
                prepend-icon="mdi-food"
                :search-input="searchArticles"
            />
        </div>


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
                            <validation-observer ref="obsAddCategory">
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
                        <validation-provider name="Nom de la catégorie" rules="required|max:25"
                                             v-slot="{ errors, valid }">
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
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="deleteCategory(editedCategory)"
                        color="primary"
                        text>
                        Supprimer
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="updateCategory()"
                        color="primary"
                        text>
                        Mettre à jour
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <h2 class="mt-3"> Mes articles</h2>
        <div class="d-flex flex-wrap">
            <v-card
                class="ml-2 mt-5 ml-2"
                max-width="160px"
                v-for="(article, index) in this.articles"
                v-bind:key=index
                v-bind:src=article
                @click="openDialogUpdateArticle(article)"
            >
                <v-img
                    rounded
                    width="200px"
                    height="100px"
                    :src=article.ArticleImg
                ></v-img>
                <v-card-text class=text-center>
                    {{ article.Name }}
                </v-card-text>
            </v-card>

            <v-dialog
                v-model="showDialogUpdateAndDeleteArticle"
                width="500">
                <v-card :loading="loadingCategory">
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

                            <validation-provider name="Catégorie" rules="required" v-slot="{ errors, valid }">
                                <v-autocomplete
                                    v-model="editedArticle.Category"
                                    prepend-icon="mdi-shape-square-rounded-plus"
                                    :items="categories"
                                    item-text="Name"
                                    label="Catégorie"
                                    persistent-hint
                                    :error-messages="errors"
                                    :success="valid"
                                    return-object
                                />
                            </validation-provider>

                            <validation-provider name="Prix de l'article" rules="required|max:500|min:0"
                                                 v-slot="{ errors, valid }">
                                <v-text-field
                                    prepend-icon="mdi-currency-eur"
                                    v-model="editedArticle.Price"
                                    label="Prix de l'article"
                                    type="number"
                                    :error-messages="errors"
                                    :success="valid"
                                />
                            </validation-provider>

                            <v-file-input
                                v-model="editedArticleImg"
                                show-size
                                label="Photo de l'article"
                                prepend-icon="mdi-image"
                                @change="uploadArticleImg()"
                                truncate-length="15"
                                accept="image/*">
                            </v-file-input>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn
                                    @click="showDialogUpdateAndDeleteArticle = false"
                                    color="primary"
                                    text>
                                    Retour
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="deleteArticle(editedArticle)"
                                    color="primary"
                                    text>
                                    Supprimer
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click=" updateArticle()"
                                    color="primary"
                                    text>
                                    Mettre à jour
                                </v-btn>

                            </v-card-actions>
                        </v-card-text>
                    </validation-observer>
                </v-card>
            </v-dialog>
            <div>
                <v-dialog
                    v-model="showDialogAddArticle"
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            color="primary"
                            class="ma-16 d-flex justify-center"
                            x-large
                            v-bind="attrs"
                            @click="showDialogAddArticle = true"
                            v-on="on">
                            <v-icon size="70">mdi-plus-circle-outline</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            Créer un article
                        </v-card-title>
                        <validation-observer ref="obsAddArticle">
                            <v-card-text>
                                <validation-provider name="Nom de l'article" rules="required|max:30"
                                                     v-slot="{ errors, valid }">
                                    <v-text-field
                                        prepend-icon="mdi-food"
                                        v-model="article.Name"
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
                                        v-model="article.Description"
                                        :counter="140"
                                        label="Description de l'article"
                                        :error-messages="errors"
                                        :success="valid"
                                    ></v-text-field>
                                </validation-provider>

                                <validation-provider name="Catégorie" rules="required" v-slot="{ errors, valid }">
                                    <v-autocomplete
                                        v-model="article.Category"
                                        prepend-icon="mdi-shape-square-rounded-plus"
                                        :items="categories"
                                        item-text="Name"
                                        label="Catégorie"
                                        persistent-hint
                                        :error-messages="errors"
                                        :success="valid"
                                        return-object
                                    />
                                </validation-provider>
                                <validation-provider name="Prix de l'article" rules="required|min:0|max:500"
                                                     v-slot="{ errors, valid }">
                                    <v-text-field
                                        prepend-icon="mdi-currency-eur"
                                        v-model="article.Price"
                                        label="Prix de l'article"
                                        required
                                        type="number"
                                        :error-messages="errors"
                                        :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                                <validation-provider>
                                    <v-file-input
                                        v-model="articleImg"
                                        show-size
                                        label="Photo de l'article"
                                        prepend-icon="mdi-image"
                                        @change="uploadNewArticleImg()"
                                        truncate-length="15"
                                        accept="image/*">
                                    </v-file-input>
                                </validation-provider>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn
                                    @click="showDialogAddArticle = false"
                                    color="primary"
                                    text
                                >
                                    Retour
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="addArticle()"
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

        <h2 class="mt-7">Mes menus</h2>
        <v-card>
            <v-card-title>
                <v-btn
                    @click="showDialogAddMenu = true"
                    color="primary"
                    rounded>
                    Ajouter un menu
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Rechercher"
                    single-line
                    hide-details
                ></v-text-field>


            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="menus"
                :search="search"
            >
                <template v-slot:[`item.MenuImg`]="{ item }">
                    <v-img width="100px" :src="item.MenuImg">

                    </v-img>
                </template>

                <template v-slot:[`item.Articles`]="{ item }">
                    <v-chip-group
                        column>
                        <template
                            v-for="(article, index) in item.Articles">
                            <v-chip
                                v-bind:key=index
                                v-bind:title=article.Name
                                class="mr-3 mb-3 font-40" rounded>
                                {{ article.Name }}
                            </v-chip>
                        </template>
                    </v-chip-group>
                </template>

                <template v-slot:[`item.Price`]="{ item }">
                    {{ item.Price }} €
                </template>

                <template v-slot:[`item.Actions`]="{ item }">
                    <div class="d-flex">
                        <v-btn
                            @click="openDialogUpdateMenu(item)"
                            color="primary"
                            icon>
                            <v-icon>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="openDialogDelete(item)"
                            color="primary"
                            icon>
                            <v-icon>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </div>

                </template>

            </v-data-table>
        </v-card>

        <v-dialog
            v-model="showDialogUpdateMenu"
            width="500">
            <v-card :loading="loadingArticle">
                <v-card-title>
                    Modifier le menu
                </v-card-title>
                <validation-observer ref="obsUpdateMenu">
                    <v-card-text>
                        <validation-provider name="Nom du menu" rules="required|max:30"
                                             v-slot="{ errors, valid }">
                            <v-text-field
                                prepend-icon="mdi-food"
                                v-model="editedMenu.Name"
                                :counter="25"
                                label="Nom du Menu"
                                :error-messages="errors"
                                :success="valid"
                            ></v-text-field>
                        </validation-provider>
                        <validation-provider name="Description du Menu" rules="required|max:140"
                                             v-slot="{ errors, valid }">
                            <v-text-field
                                prepend-icon="mdi-image-text"
                                v-model="editedMenu.Description"
                                :counter="140"
                                label="Description du menu"
                                :error-messages="errors"
                                :success="valid">
                            </v-text-field>
                        </validation-provider>

                        <validation-provider name="Articles" rules="required" v-slot="{ errors, valid }">
                            <v-autocomplete
                                v-model="editedMenu.Articles"
                                prepend-icon="mdi-shape-square-rounded-plus"
                                :items="articles"
                                multiple
                                item-text="Name"
                                label="Articles"
                                persistent-hint
                                chips
                                :error-messages="errors"
                                :success="valid"
                                return-object
                            />
                        </validation-provider>

                        <validation-provider name="Prix du manu" rules="required|max:500|min:0"
                                             v-slot="{ errors, valid }">
                            <v-text-field
                                prepend-icon="mdi-currency-eur"
                                v-model="editedMenu.Price"
                                label="Prix du menu"
                                type="number"
                                :error-messages="errors"
                                :success="valid"
                            />
                        </validation-provider>

                        <v-file-input
                            v-model="editedMenuImg"
                            show-size
                            label="Photo du menu"
                            prepend-icon="mdi-image"
                            @change="uploadMenuImg()"
                            truncate-length="15"
                            accept="image/*">
                        </v-file-input>

                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn
                                @click="showDialogUpdateMenu = false"
                                color="primary"
                                text>
                                Retour
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click=" updateMenu()"
                                color="primary"
                                text>
                                Mettre à jour
                            </v-btn>

                        </v-card-actions>
                    </v-card-text>
                </validation-observer>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="showDialogAddMenu"
            width="500">
            <v-card :loading="loadingArticle">
                <v-card-title>
                    Ajouter un menu
                </v-card-title>
                <validation-observer ref="obsAddMenu">
                    <v-card-text>
                        <validation-provider name="Nom du menu" rules="required|max:30"
                                             v-slot="{ errors, valid }">
                            <v-text-field
                                prepend-icon="mdi-food"
                                v-model="menu.Name"
                                :counter="25"
                                label="Nom du Menu"
                                :error-messages="errors"
                                :success="valid"
                            ></v-text-field>
                        </validation-provider>
                        <validation-provider name="Description du Menu" rules="required|max:140"
                                             v-slot="{ errors, valid }">
                            <v-text-field
                                prepend-icon="mdi-image-text"
                                v-model="menu.Description"
                                :counter="140"
                                label="Description du menu"
                                :error-messages="errors"
                                :success="valid">
                            </v-text-field>
                        </validation-provider>

                        <validation-provider name="Articles" rules="required" v-slot="{ errors, valid }">
                            <v-autocomplete
                                v-model="menu.Articles"
                                prepend-icon="mdi-shape-square-rounded-plus"
                                :items="articles"
                                multiple
                                chips
                                item-text="Name"
                                label="Articles"
                                persistent-hint
                                :error-messages="errors"
                                :success="valid"
                                return-object
                            />
                        </validation-provider>

                        <validation-provider name="Prix du menu" rules="required|max:500|min:0"
                                             v-slot="{ errors, valid }">
                            <v-text-field
                                prepend-icon="mdi-currency-eur"
                                v-model="menu.Price"
                                label="Prix du menu"
                                type="number"
                                :error-messages="errors"
                                :success="valid"
                            />
                        </validation-provider>

                        <v-file-input
                            v-model="menuImg"
                            show-size
                            label="Photo du menu"
                            prepend-icon="mdi-image"
                            @change="uploadNewMenuImg()"
                            truncate-length="15"
                            accept="image/*">
                        </v-file-input>

                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn
                                @click="showDialogAddMenu = false"
                                color="primary"
                                text>
                                Retour
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click=" addMenu()"
                                color="primary"
                                text>
                                Valider
                            </v-btn>

                        </v-card-actions>
                    </v-card-text>
                </validation-observer>
            </v-card>
        </v-dialog>

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
    headers = [
        {text: "Nom", value: "Name"},
        {text: "Photo", value: "MenuImg"},
        {text: "Articles", value: "Articles", sortable: false},
        {text: "Prix", value: "Price"},
        {text: "Actions", value: "Actions", sortable: false},

    ];
    category = {};
    editedCategory = {};
    editedCategoryId = "";

    article = {
        ArticleImg: "",
    };
    articleImg = null;

    editedArticle = {
        ArticleImg: "",
        Category: {
            Name: "",
        }
    };
    editedArticleId = "";
    editedArticleImg = null;

    menu = {
        MenuImg: "",
        Articles: []
    }
    menuImg = null
    resultArticleImg: ArrayBuffer | string | null = null;

    editedMenu = {
        Articles: [{
            Name: "",
        }],
        MenuImg: "",
    }
    editedMenuId = "";
    editedMenuImg = null;
    resultMenuImg: ArrayBuffer | string | null = null;


    loadingCategory = false;
    loadingArticle = false;

    showDialogUpdateAndDeleteCategory = false;
    showDialogUpdateAndDeleteArticle = false;
    showDialogUpdateMenu = false;

    showDialogAddCategory = false;
    showDialogAddArticle = false;
    showDialogAddMenu = false;

    restaurantId = this.$cookies.get('restaurant_id');

    search = "";
    searchArticles = "";

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
        this.loadingCategory = true;
        this.$axios.get('articles/' + article._id).then(response => {
            this.editedArticle.Category = response.data.article.Category;

        })
            .finally(() => this.loadingCategory = false)
        this.editedArticle = JSON.parse(JSON.stringify(article));
        this.editedArticleId = article._id;
        this.showDialogUpdateAndDeleteArticle = true;
    }

    openDialogUpdateCategory(category) {
        this.editedCategory = JSON.parse(JSON.stringify(category));
        this.editedCategoryId = category._id;
        this.showDialogUpdateAndDeleteCategory = true;
    }

    openDialogUpdateMenu(menu) {
        this.loadingArticle = true;
        this.$axios.get('menus/' + menu._id).then(response => {
            this.editedMenu.Articles = response.data.menu.Articles;

        })
            .finally(() => this.loadingArticle = false)
        this.editedMenu = JSON.parse(JSON.stringify(menu));
        this.editedMenuId = menu._id;
        this.showDialogUpdateMenu = true;
    }

    addArticle() {
        this.$refs.obsAddArticle.validate().then(success => {
            if (success) {
                if (this.resultArticleImg !== null) {
                    this.article.ArticleImg = this.resultArticleImg.toString();
                }
                this.$axios.post(`articles/` + this.restaurantId, {data: this.article}).then(() => {
                    this.getAllArticles();
                }).finally(() => {
                    this.showDialogAddArticle = false;
                })
            }
        });
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

    addMenu() {
        this.$refs.obsAddMenu.validate().then(success => {
            if (success) {
                if (this.resultMenuImg !== null) {
                    this.menu.MenuImg = this.resultMenuImg.toString();
                }
                this.$axios.post(`menus/` + this.restaurantId, {data: this.menu}).then(() => {
                    this.getAllMenus();
                }).finally(() => {
                    this.showDialogAddMenu = false;
                })
            }
        });
    }

    updateArticle() {
        this.$refs.obsUpdateArticle.validate().then(success => {
            if (success) {
                if (this.resultArticleImg !== null) {
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

    updateMenu() {
        this.$refs.obsUpdateMenu.validate().then(success => {
            if (success) {
                if (this.resultMenuImg !== null) {
                    this.editedMenu.MenuImg = this.resultMenuImg.toString();
                }
                this.$axios.put(`menus/` + this.editedMenuId, {data: this.editedMenu}).then(() => {
                    this.getAllMenus();
                }).finally(() => {
                    this.showDialogUpdateMenu = false;
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

    openDialogDelete(object) {
        console.log(object);
    }


    uploadArticleImg() {
        if (this.editedArticleImg !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.resultArticleImg = reader.result;
            }
            reader.readAsDataURL(this.editedArticleImg)
        } else {
            this.resultArticleImg = null;
        }
    }

    uploadNewArticleImg() {
        if (this.articleImg !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.resultArticleImg = reader.result;
            }
            reader.readAsDataURL(this.articleImg)
        } else {
            this.resultArticleImg = null;
        }
    }

    uploadMenuImg() {
        if (this.editedMenuImg !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.resultMenuImg = reader.result;
            }
            reader.readAsDataURL(this.editedMenuImg)
        } else {
            this.resultMenuImg = null;
        }
    }

    uploadNewMenuImg() {
        if (this.menuImg !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.resultMenuImg = reader.result;
            }
            reader.readAsDataURL(this.menuImg)
        } else {
            this.resultMenuImg = null;
        }
    }
}

</script>


