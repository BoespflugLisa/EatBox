const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const port = 3031;
const config = require("./config")

const RestaurantsRouter = require("./routes/posts/RestaurantRouter");
const UsersRouter = require("./routes/posts/UserRouter");
/*const CardsRouter = require("./routes/posts/Restaurant");
const CategoriesRouter = require("./routes/posts/Restaurant");
const ArticlesRouter = require("./routes/posts/Restaurant");
const MenusRouter = require("./routes/posts/Restaurant");
const StatsRouter = require("./routes/posts/Restaurant");*/

app.use(logger("dev"));

const dbUrl = config.dbUrl;

const options = {
    keepAlive: true,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
    if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/restaurants", RestaurantsRouter);
app.use("/users", UsersRouter);
/*app.use("/cartes", CardsRouter);
app.use("/categories", CategoriesRouter);
app.use("/articles", ArticlesRouter);
app.use("/menus", MenusRouter);
app.use("/stats", StatsRouter);*/

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;