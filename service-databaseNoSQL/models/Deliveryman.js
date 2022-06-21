const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DeliverymanSchema = new Schema(
    {
        belongs_to : {type: Schema.Types.ObjectId, ref: 'UserModel'},
        Name: String,
        Firstname: String,
        Picture: String,
        Open_to_work: Boolean,
        Free : Boolean,

    }
);

let Deliveryman = mongoose.model("Deliveryman", DeliverymanSchema, "Deliveryman");

module.exports = Deliveryman;