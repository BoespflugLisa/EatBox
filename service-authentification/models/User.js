const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    Username: String,
    Email: String,
    Password: String,
    Phone : String,
    Role : String, //Restaurant Livreur Client
    Type : String,
    Legal : {
        SIRET : String,
        IBAN : String,
    }
});

let UserLogin = mongoose.model("UsersLogModel", UserSchema, "users_login");

module.exports = {
    model : UserLogin,
    schema : UserSchema
};