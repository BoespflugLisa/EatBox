const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LogConnectionSchema = new Schema(
    {
        belongs_to: {type: Schema.Types.ObjectId, ref: 'UsersLogModel'},
        Datetime: Date,
    }
);

let LogConnection = mongoose.model("LogConnectionModel", LogConnectionSchema, 'logsconnection');

module.exports = {
    model: LogConnection,
    schema: LogConnectionSchema
};
