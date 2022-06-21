let config = {
    dbUrl:
        'mongodb+srv://root:KK4C2U282Ec5S7DT@eatbox-cluster.ogtl4.mongodb.net/Eatbox-NoSQL',
    option:
        {
            keepAlive: true,
            connectTimeoutMS: 30000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

};
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = config.dbUrl
db.options = config.option;

db.restaurants = require("./models/Restaurant")(mongoose);
db.users = require("./models/User")(mongoose);
//db.deliverymen
//db.menus
//db.carts
//db.articles

module.exports = db;
