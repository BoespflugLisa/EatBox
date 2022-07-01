let config = {
    dbUrl:
        'mongodb+srv://root:KK4C2U282Ec5S7DT@eatbox-cluster.ogtl4.mongodb.net/Eatbox-NoSQL',
    options:
        {
            keepAlive: true,
            connectTimeoutMS: 30000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    secret: "91OTXjGNf1NV48zQ5loH" +
        "ejSGEBcFRH3azYE0iLxE" +
        "YGkoC75dcQA3tiRYEH3w",

};

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = config.dbUrl
db.options = config.options;
db.secret = config.secret;

const UsersModel = require("./models/User");

const RestaurantsSchema = require('../service-databaseNoSQL/models/Restaurant').schema
db.mongoose.model("RestaurantModel", RestaurantsSchema, "restaurants");

const LivreursSchema = require('../service-databaseNoSQL/models/Deliveryman').schema
db.mongoose.model('LivreurModel', LivreursSchema, "deliverymen")

const ClientSchema = require('../service-databaseNoSQL/models/Client').schema
db.mongoose.model("ClientModel", ClientSchema, 'clients');

const DeveloperSchema = require('../service-databaseNoSQL/models/Developer').schema
db.mongoose.model("DeveloperModel", DeveloperSchema, 'developers');

/*const RestaurantsModel = require("../service-databaseNoSQL/models/Restaurant");
const OrdersModel = require("../service-databaseNoSQL/models/Order");
const ArticlesModel = require("../service-databaseNoSQL/models/Article");
const StatsModel = require("../service-databaseNoSQL/models/Stats")
const MenusModel = require("../service-databaseNoSQL/models/Menu");
const PerformancesModel = require("../service-databaseNoSQL/models/Perfomance");*/



module.exports = db;
