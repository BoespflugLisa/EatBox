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
db.options = config.options;

const RestaurantsModel = require("../service-restaurants/models/Restaurant");
const ArticlesModel = require("../service-restaurants/models/Article");
const StatsModel = require("./models/Stats")
const MenusModel = require("../service-restaurants/models/Menu");
const PerformancesModel = require("./models/Perfomance");

const UsersSchema =  require("../service-authentification/models/User").schema
db.mongoose.model('UsersLogModel', UsersSchema, "users_login")

db.restaurants = RestaurantsModel;
//db.deliverymen
//db.menus
//db.carts
//db.articles

module.exports = db;
