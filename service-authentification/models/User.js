const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    Email: String,
    Password: String,
    Role : String, //Restaurant Livreur Client
    token : String,
    isConnected : Boolean,
});

let UserLogin = mongoose.model("UsersLogModel", UserSchema, "users_login");

module.exports = {
    model : UserLogin,
    schema : UserSchema
};