const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NotificationSchema = new Schema(
    {
        belongs_to: {type: Schema.Types.ObjectId},
        Name: String,
        Date: Date,
        Read: Boolean,
        Types: {
            Command: Boolean,
            Delivery: Boolean,
        },
        Message: String,
    });

let Notification = mongoose.model("NotificationModel", NotificationSchema, "notifications");

module.exports = Notification;