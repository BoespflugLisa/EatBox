const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    Email: String,
    Password: String,
    restaurant : {type: Schema.Types.ObjectId, ref: 'RestaurantModel'},
    livreur : {type: Schema.Types.ObjectId, ref: 'LivreurModel'},
    client : {type: Schema.Types.ObjectId, ref: 'ClientModel'},
    suspended : Boolean
});

let UserLogin = mongoose.model("UsersLogModel", UserSchema, "users_login");

module.exports = {
    model : UserLogin,
    schema : UserSchema
};