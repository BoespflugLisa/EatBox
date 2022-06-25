const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClientSchema = new Schema(
    {
        belongs_to : {type: Schema.Types.ObjectId, ref: 'UsersLogModel'},
    }
);

let Client = mongoose.model("ClientModel", ClientSchema);

module.exports = Client;