const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    Email: String,
    Password: String,
    Role: String,
    restaurant : {type: Schema.Types.ObjectId, ref: 'RestaurantModel'},
    livreur : {type: Schema.Types.ObjectId, ref: 'LivreurModel'},
    client : {type: Schema.Types.ObjectId, ref: 'ClientModel'},
    developpeur : {type: Schema.Types.ObjectId, ref: 'DeveloperModel'},
});

let UserLogin = mongoose.model("UsersLogModel", UserSchema, "users_login");

module.exports = {
    model : UserLogin,
    schema : UserSchema
};