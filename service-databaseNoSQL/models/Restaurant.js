const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RestaurantSchema = new Schema(
    {
        _id: Number,
        Nom: String,
        Type: String,
        Adresse: {
            numero : Number,
            nom: String,
            ville: String,
            code: Number
        },
        Identification: {
            compte: String,
            iban: String,
            siret: String,
        },
        Manager_ID : String,/*{
            type: Schema.Types.ObjectId,
            ref: 'User'
            //https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose
            //https://mongoosejs.com/docs/populate.html
        },*/
        Days : {
            type: [String],
            heures : {
                0 : String,
                1 : String
            },
        }
    }
);

let Restaurant = mongoose.model("RestaurantModel", RestaurantSchema, "restaurants");

module.exports = Restaurant;