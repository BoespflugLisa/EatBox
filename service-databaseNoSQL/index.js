const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = 3031;

const RestaurantsRouter = require("./routes/posts/RestaurantRouter");
const UsersRouter = require("./routes/posts/UserRouter");
/*const CardsRouter = require("./routes/posts/Restaurant");
const CategoriesRouter = require("./routes/posts/Restaurant");
const ArticlesRouter = require("./routes/posts/Restaurant");
const MenusRouter = require("./routes/posts/Restaurant");
const StatsRouter = require("./routes/posts/Restaurant");*/

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./config");

db.mongoose
    .connect(db.url, db.options)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

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