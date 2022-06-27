const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NotificationSchema = new Schema(
    {
        belongs_to: {type: Schema.Types.ObjectId, ref: 'UsersLogModel'},
        Name: String,
        Date: Date,
        Read: Boolean,
        Types: {
            Command: Boolean,
            Activity: Boolean,
            Delivery: Boolean,
        },
        Message: String,
        id_Client_U: {type: Schema.Types.ObjectId, ref: 'ClientModel'},
        id_Command: {type: Schema.Types.ObjectId, ref: 'OrderModel'},
        id_Client_D: {type: Schema.Types.ObjectId, ref: 'DeliverymanModel'},
        id_Restaurant: {type: Schema.Types.ObjectId, ref: 'RestaurantModel'},
        id_statistics: {type: Schema.Types.ObjectId, ref: 'StatsModel'}
    });

let Notification = mongoose.model("NotificationModel", NotificationSchema, "notifications");

module.exports = Notification;