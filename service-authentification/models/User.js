const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    Username: String,
    Email: String,
    Password: String,
    Phone : String,
    Type : String, //Restaurant Livreur Client
});

let UserLogin = mongoose.model("UserModel", UserSchema, "users_login");

module.exports = UserLogin;