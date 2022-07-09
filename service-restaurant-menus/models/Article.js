const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ArticleSchema = new Schema(
    {
        made_by:  String,
        Name: String,
        Category: {type: Schema.Types.ObjectId, ref: 'CategoryModel'},
        ArticleImg: String,
        Description: String,
        Price: Number,
        Available: Boolean
    }
);

let Article = mongoose.model("ArticleModel", ArticleSchema, "articles");

module.exports = Article;
