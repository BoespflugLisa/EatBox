const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
    {

    }
);

let Order = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = Order;
