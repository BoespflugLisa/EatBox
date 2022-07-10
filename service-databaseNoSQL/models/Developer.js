const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DeveloperSchema = new Schema(
    {
        belongs_to: {type: Schema.Types.ObjectId, ref: 'UsersLogModel'},
        Lastname: String,
        Firstname: String,
    }
);

let Developer = mongoose.model("DeveloperModel", DeveloperSchema, 'developers');

module.exports = {
    model: Developer,
    schema: DeveloperSchema
};