const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CategorySchema = new Schema(
    {
        belongs_to: {type: Schema.Types.ObjectId, ref: 'RestaurantModel'},
        Name: String,
        State: Boolean,
    }
);

let Category = mongoose.model("CategoryModel", CategorySchema, 'categories');

module.exports = {
    model: Category,
    schema: CategorySchema
};