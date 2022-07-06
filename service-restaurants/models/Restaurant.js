const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RestaurantSchema = new Schema(
    {
        belongs_to: Schema.Types.ObjectId,/*{
            type: Schema.Types.ObjectId,
            ref: 'User'
            //https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose
            //https://mongoosejs.com/docs/populate.html
        },*/
        Role : String,
        Name: String,
        Type: String,
        CoverImg : String,
        hours: {
            monday: {
                isOpen: Boolean,
                isSecondTimeRange: Boolean,
                startHour: String,
                endHour: String,
                startHour2: String,
                endHour2: String,
            },
            tuesday: {
                isOpen: Boolean,
                isSecondTimeRange: Boolean,
                startHour: String,
                endHour: String,
                startHour2: String,
                endHour2: String,
            },
            wednesday: {
                isOpen: Boolean,
                isSecondTimeRange: Boolean,
                startHour: String,
                endHour: String,
                startHour2: String,
                endHour2: String,
            },
            thursday: {
                isOpen: Boolean,
                isSecondTimeRange: Boolean,
                startHour: String,
                endHour: String,
                startHour2: String,
                endHour2: String,
            },
            friday: {
                isOpen: Boolean,
                isSecondTimeRange: Boolean,
                startHour: String,
                endHour: String,
                startHour2: String,
                endHour2: String,
            },
            saturday: {
                isOpen: Boolean,
                isSecondTimeRange: Boolean,
                startHour: String,
                endHour: String,
                startHour2: String,
                endHour2: String,
            },
            sunday: {
                isOpen: Boolean,
                isSecondTimeRange: Boolean,
                startHour: String,
                endHour: String,
                startHour2: String,
                endHour2: String,
            },
        },
        Address: {
            Number: String,
            Street: String,
            Town: String,
            Code: String
        },
        Phone: String,
        Legal: {
            AccountName: String,
            IBAN: String,
            SIRET: String,
            BIC: String,
        },
        Preferences: {
            NotificationCommand: Boolean,
            NotificationDeliveryman: Boolean,
            NotificationActivities: Boolean,
        },
        Sponsors: {
            sponsors: [String],
            sponsored: [String],
        }
    }
);

let Restaurant = mongoose.model("RestaurantModel", RestaurantSchema, "restaurants");

module.exports = {
    model: Restaurant,
    schema : RestaurantSchema
};
