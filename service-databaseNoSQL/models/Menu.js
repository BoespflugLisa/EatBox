const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MenusSchema = new Schema(
    {
        made_by: {type: Schema.Types.ObjectId, ref: 'RestaurantModel'},
        Name: String,
        Description: String,
        Image: {type: String, default: "data://default.jpeg"},
        Price: Number,
        Articles: [{type: Schema.Types.ObjectId, ref: 'ArticleModel'}],
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
    }
);

let Menus = mongoose.model("MenuModel", MenusSchema, "menus");

module.exports = Menus;
