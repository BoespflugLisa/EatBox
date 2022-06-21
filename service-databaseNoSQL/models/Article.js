const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ArticleSchema = new Schema(
    {
        made_by: {type: String, ref: 'RestaurantModel'},
        //belongs_to : {type: [Schema.Types.ObjectId], ref: "Categories"},
        Name: String,
        Image_path: String,
        Description: String,
        Price: Number,
        Available: Boolean,
        Promotions: {
            UnPour2: Boolean,
            Remise: {
                5: Boolean,
                10: Boolean,
                15: Boolean,
                20: Boolean,
            },
        },
        Options: {
            Taille: {Petit: Boolean, Moyen: Boolean, Large: Boolean},
            Sauce: {
                Ketchup: Boolean,
                Mayonnaise: Boolean,
                Moutarde: Boolean,
                Barbecue: Boolean,
                Maison: Boolean,
                Andalouse: Boolean
            },
            Prix: {Taille: [Number], Sauce: [Number]},
        },
    }
);

let Article = mongoose.model("ArticleModel", ArticleSchema, "articles");

module.exports = Article;
