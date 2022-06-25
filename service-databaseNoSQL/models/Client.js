const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClientSchema = new Schema(
    {
        belongs_to : {type: Schema.Types.ObjectId, ref: 'UsersLogModel'},
        Name: String,
        Firstname: String,
        Picture: String,
        Address: {
            Number : String,
            Street: String,
            Town: String,
            Code: Number
        },
    }
);

let Client = mongoose.model("ClientModel", ClientSchema, 'clients');

module.exports = Client;