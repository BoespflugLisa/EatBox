const express = require("express");
const app = express();
const expressWs = require('express-ws')(app);

const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3035;

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const db = require("./config");

db.mongoose.connect(db.url, db.options)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


const MenusRouter = require("./routes/MenuRouter");
const ArticlesRouter = require("./routes/ArticleRouter");
const CategoriesRouter = require("./routes/CategoryRouter");

app.use("/articles", ArticlesRouter);
app.use("/menus", MenusRouter);
app.use("/categories", CategoriesRouter);


app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;
