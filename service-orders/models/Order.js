const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
    {
        N_Order : String,
        State : Number,
        Payment : String,
        Rating: Number,
        Restaurant : String,
        Client : String,
        Deliveryman_token : String,
        Complementary : String,
        Detail : {
            Price : Number,
            Menus : {type: [Schema.Types.ObjectId]},
            Articles : {type: [Schema.Types.ObjectId]},
            Paid : Boolean,
        },
        CheckTime : {
            Created_at : Date,
            Accepted_at : Date,
            Ready_at: Date,
            Pickedup_at: Date,
            Delivered_at: Date,
            Cancelled_at: Date,
        },
    }
);

let Order = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = Order;
