<template>

    <div class="side-padding" id="ArticlesEtMenus">
        <h1 class="mt-3"> Ma carte</h1>
        <div class="mt-4 d-flex justify-space-between">
            <h2> Mes catégories</h2>
            <div>
                <v-dialog
                    v-model="showDialogAddCategory"
                    width="500">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
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

        <div class="mt-4 d-flex justify-space-between">
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
                        @click="() => { this.categoryToDelete = true; showDialogConfirmDelete = true; deletedCategory = editedCategory}"
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


        <div class="mt-3 d-flex justify-space-between">
            <h2> Mes articles</h2>
            <div>
                <v-dialog
                    v-model="showDialogAddArticle"
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            color="primary"
                            v-bind="attrs"
                            @click="showDialogAddArticle = true"
                            v-on="on">
                            <v-icon size="30">mdi-plus-circle-outline</v-icon>
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
        <div>
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
                    <v-card-text class="text-center">
                        <v-tooltip bottom v-if="article.Category === null">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    color="primary"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    mdi-alert
                                    mdi-alert
                                </v-icon>
                            </template>
                            <span>Ajouter une catégorie à l'article!</span>
                        </v-tooltip>
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
                                        @click="() => { this.articleToDelete = true; showDialogConfirmDelete = true; deletedArticle = editedArticle}"
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
            </div>
            <div class="d-flex justify-center">
                <v-btn
                    v-if="loadingArticle"
                    icon
                    color="primary"
                    :loading="loadingArticle"
                >
                    <v-icon>
                        mdi-loading
                    </v-icon>
                </v-btn>
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
                :loading="loadingMenu"
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
                            @click="() => {menuToDelete = true; showDialogConfirmDelete = true; deletedMenu = item}"
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

        <v-dialog
            v-model="showDialogConfirmDelete"
            width="500">
            <v-card v-if="categoryToDelete === true">
                <v-card-title>
                    Supprimer la catégorie : {{ deletedCategory.Name }}
                </v-card-title>
                <v-card-text>
                    Tous les articles possédant cette catégorie ne seront pas mis en vente.
                    Il faut attribuer une nouvelle catégorie à ces articles.

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            @click="() => { this.categoryToDelete = false; showDialogConfirmDelete = false}"
                            color="primary"
                            text>
                            Retour
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="deleteCategory(deletedCategory)"
                            color="primary"
                            text>
                            Valider
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>

            <v-card v-if="articleToDelete === true">
                <v-card-title>
                    Supprimer l'article : {{ deletedArticle.Name }}
                </v-card-title>
                <v-card-text>
                    L'article sera supprimé des menus dans lesquels il se trouve.
                    <v-card-actions>
                        <v-btn
                            @click="() => { this.articleToDelete = false; showDialogConfirmDelete = false}"
                            color="primary"
                            text>
                            Retour
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="deleteArticle(deletedArticle)"
                            color="primary"
                            text>
                            Valider
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>

            <v-card v-if="menuToDelete === true">
                <v-card-title>
                    Supprimer le menu : {{ deletedMenu.Name }}
                </v-card-title>
                <v-card-text>
                    Les articles de ce menu ne seront pas supprimés
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            @click="() => { this.menuToDelete = false; showDialogConfirmDelete = false}"
                            color="primary"
                            text>
                            Retour
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="deleteMenu(deletedMenu)"
                            color="primary"
                            text>
                            Valider
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
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

    deletedCategory = {};
    deletedArticle = {};
    deletedMenu = {};

    loadingCategory = false;
    loadingArticle = false;
    loadingMenu = false;

    categoryToDelete = false;
    articleToDelete = false;
    menuToDelete = false;

    showDialogUpdateAndDeleteCategory = false;
    showDialogUpdateAndDeleteArticle = false;
    showDialogUpdateMenu = false;

    showDialogAddCategory = false;
    showDialogAddArticle = false;
    showDialogAddMenu = false;

    showDialogConfirmDelete = false;

    restaurantId = this.$cookies.get('user_id');

    search = "";

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
        let access_token = this.$cookies.get('token');
        this.loadingCategory = true;
        return this.$axios.get(`restaurants/categories/` + this.restaurantId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
            .then(response => {
                this.categories = response.data.categorie;
            }).finally(() => {
                this.loadingCategory = false;
            })
    }

    getAllArticles() {
        let access_token = this.$cookies.get('token');
        this.loadingArticle = true;
        return this.$axios.get(`restaurants/articles/` + this.restaurantId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
            .then(response => {
                this.articles = response.data.article;
            }).finally(() => {
                this.loadingArticle = false;
            })
    }

    getAllMenus() {
        let access_token = this.$cookies.get('token');
        this.loadingMenu = true;
        return this.$axios.get(`restaurants/menus/` + this.restaurantId, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })
            .then(response => {
                this.menus = response.data.menu;
            }).finally(() => this.loadingMenu = false)
    }

    openDialogUpdateArticle(article) {
        let access_token = this.$cookies.get('token');
        this.loadingCategory = true;
        this.$axios.get('articles/' + article._id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(response => {
            this.editedArticle.Category = response.data.article.Category;

        })
            .finally(() => this.loadingCategory = false)
        this.editedArticle = JSON.parse(JSON.stringify(article));
        this.editedArticleId = article._id;
        this.showDialogUpdateAndDeleteArticle = true;
        this.articleToDelete = true;
    }

    openDialogUpdateCategory(category) {
        this.articleToDelete = false;
        this.editedCategory = JSON.parse(JSON.stringify(category));
        this.editedCategoryId = category._id;
        this.showDialogUpdateAndDeleteCategory = true;
    }

    openDialogUpdateMenu(menu) {
        let access_token = this.$cookies.get('token');
        this.loadingArticle = true;
        this.$axios.get('menus/' + menu._id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(response => {
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
                let access_token = this.$cookies.get('token');
                if (this.resultArticleImg !== null) {
                    this.article.ArticleImg = this.resultArticleImg.toString();
                }
                this.$axios.post(`articles/` + this.restaurantId, {data: this.article}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(() => {
                    this.getAllArticles();
                }).finally(() => {
                    this.showDialogAddArticle = false;
                })
            }
        });
    }

    addCategory() {
        let access_token = this.$cookies.get('token');
        this.$refs.obsAddCategory.validate().then(success => {
            if (success) {
                this.$axios.post(`categories/` + this.restaurantId, {data: this.category}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(() => {
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
                let access_token = this.$cookies.get('token');
                if (this.resultMenuImg !== null) {
                    this.menu.MenuImg = this.resultMenuImg.toString();
                }
                this.$axios.post(`menus/` + this.restaurantId, {data: this.menu}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(() => {
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
                let access_token = this.$cookies.get('token');
                if (this.resultArticleImg !== null) {
                    this.editedArticle.ArticleImg = this.resultArticleImg.toString();
                }
                this.$axios.put(`articles/` + this.editedArticleId, {data: this.editedArticle}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(() => {
                    this.getAllArticles();
                }).finally(() => {
                    this.showDialogUpdateAndDeleteArticle = false;
                    this.articleToDelete = false;
                })
            }
        });
    }

    updateCategory() {
        this.$refs.obsUpdateCategory.validate().then(success => {
            if (success) {
                let access_token = this.$cookies.get('token');
                this.$axios.put(`categories/` + this.editedCategoryId, {data: this.editedCategory}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(() => {
                    this.getAllCategories();
                }).finally(() => {
                    this.showDialogUpdateAndDeleteCategory = false;
                    this.categoryToDelete = false;
                })
            }
        });
    }

    updateMenu() {
        this.$refs.obsUpdateMenu.validate().then(success => {
            if (success) {
                let access_token = this.$cookies.get('token');
                if (this.resultMenuImg !== null) {
                    this.editedMenu.MenuImg = this.resultMenuImg.toString();
                }
                this.$axios.put(`menus/` + this.editedMenuId, {data: this.editedMenu}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }).then(() => {
                    this.getAllMenus();
                }).finally(() => {
                    this.showDialogUpdateMenu = false;
                })
            }
        });
    }

    deleteArticle(article) {
        let access_token = this.$cookies.get('token');
        this.categoryToDelete = false;
        this.menuToDelete = false;
        this.$axios.delete(`articles/` + article._id, {
            data: article,
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(() => {
            this.getAllArticles();
            this.getAllMenus();
        }).finally(() => {
            this.showDialogUpdateAndDeleteArticle = false;
            this.showDialogConfirmDelete = false;
            this.articleToDelete = false;
        });
    }

    deleteCategory(category) {
        this.articleToDelete = false;
        this.menuToDelete = false;
        let access_token = this.$cookies.get('token');
        this.$axios.get('articles/', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then((response) => {
            const articles = response.data.articles;
            articles.forEach(article => {
                if (article.Category === category._id) {
                    article.Category = null;
                    this.$axios.put(`articles/` + article._id, {data: article}, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        }
                    }).then()
                }
            })
        }).then(() => {
            this.$axios.delete(`categories/` + category._id, {
                data: category,
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }).then(() => {
                this.getAllCategories();
                this.getAllArticles();
            })
        })
            .finally(() => {
                this.showDialogUpdateAndDeleteCategory = false;
                this.showDialogConfirmDelete = false;
                this.categoryToDelete = false;
            });
    }

    deleteMenu(menu) {
        this.articleToDelete = false;
        this.categoryToDelete = false;
        let access_token = this.$cookies.get('token');
        this.$axios.delete(`menus/` + menu._id, {
            data: menu,
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(() => {
            this.getAllMenus();
        }).finally(() => {
            this.menuToDelete = false;
            this.showDialogConfirmDelete = false
        });
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


