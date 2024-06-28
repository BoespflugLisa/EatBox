const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DeliverymanSchema = new Schema(
    {
        belongs_to: {type: Schema.Types.ObjectId, ref: 'UsersLogModel'},
        Firstname: String,
        Lastname: String,
        Phone: String,
        ProfileImg: String,
        Open_to_work: Boolean,
        Free: Boolean,
        AccountName: String,
        IBAN: String,
    }
);

let Deliveryman = mongoose.model("Deliveryman", DeliverymanSchema, "deliverymen");

module.exports = {
    model: Deliveryman,
    schema: DeliverymanSchema
};