const express = require("express");
const app = express();
require('events').EventEmitter.defaultMaxListeners = 15;


const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = 3031;

const RestaurantsRouter = require("./routes/posts/RestaurantRouter");
const DeliverymansRouter = require("./routes/posts/DeliverymanRouter");
const OrdersRouter = require("./routes/posts/OrderRouter");
const ArticlesRouter = require("./routes/posts/ArticleRouter");
const StatsRouter = require("./routes/posts/StatsRouter");
const NotificationsRouter = require("./routes/posts/NotificationRouter");
// const CategoriesRouter = require("./routes/posts/Restaurant");
const MenusRouter = require("./routes/posts/MenuRouter");
const PerformancesRouter = require("./routes/posts/PerformanceRouter");

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./config");

db.mongoose.connect(db.url, db.options)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use("/restaurants", RestaurantsRouter);
app.use("/articles", ArticlesRouter);
app.use("/orders", OrdersRouter);
app.use("/stats", StatsRouter);
app.use("/menus", MenusRouter);
app.use("/performance", PerformancesRouter);
app.use("/deliverymans", DeliverymansRouter);
app.use("/notifications", NotificationsRouter);
// app.use("/categories", CategoriesRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;

//https://stackoverflow.com/questions/34327599/using-express-js-to-consume-an-api