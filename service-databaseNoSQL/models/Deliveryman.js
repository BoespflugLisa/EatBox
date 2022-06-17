const mongoose = require("mongoose");
let Schema = mongoose.Schema;


let DeliverymanSchema = new Schema(
    {
        _ID_Deliveryman : {
            type: Number,
            ref:'User',
            default : () => countID++
        },
        Name: String,
        Firstname: String,
        Picture: String,
        Opentowork: Boolean,
        Free : Boolean,

    }
);

let Deliveryman = mongoose.model("Deliveryman", DeliverymanSchema, "Deliveryman");
let countID = 0;
Deliveryman.countDocuments({}, function(err, count){
    countID = count;
})

module.exports = Deliveryman;