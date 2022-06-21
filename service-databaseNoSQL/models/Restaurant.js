const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RestaurantSchema = new Schema(
    {
        belongs_to : {type: Schema.Types.ObjectId, ref: 'UserModel'},/*{
            type: Schema.Types.ObjectId,
            ref: 'User'
            //https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose
            //https://mongoosejs.com/docs/populate.html
        },*/
        Name: String,
        Type: String,
        Hours: {
            Monday: [[String]],
            Tuesday: [[String]],
            Wednesday: [[String]],
            Thursday: [[String]],
            Friday: [[String]],
            Saturday: [[String]],
            Sunday: [[String]],
        },
        Address: {
            Number : String,
            Street: String,
            Town: String,
            Code: Number
        },
        Phone : String,
        Legal: {
            AccountName: String,
            IBAN: String,
            SIRET: String,
        },
    }
);

let Restaurant = mongoose.model("RestaurantModel", RestaurantSchema, "restaurants");

module.exports = Restaurant;