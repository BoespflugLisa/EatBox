const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    UserName: String,
    Email: String,
    Password: String,
});

let User = mongoose.model("UserModel", UserSchema, "users");

module.exports = User;