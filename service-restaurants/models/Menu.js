const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MenusSchema = new Schema(
    {
        made_by: String,
        Name: String,
        Description: String,
        MenuImg: String,
        Price: Number,
        Articles: [{type: Schema.Types.ObjectId, ref: 'ArticleModel'}],

    }
);

let Menus = mongoose.model("MenuModel", MenusSchema, "menus");

module.exports = Menus;
