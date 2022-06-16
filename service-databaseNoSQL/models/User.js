const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        Mail: String,
        Phone: String,
        Type: {
            Manager : Map,
            infos : {type: Map, of: [String]},
        },
    }
);

let User = mongoose.model("User", UserSchema);

module.exports = User;