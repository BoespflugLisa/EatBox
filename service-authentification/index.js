const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require("cors");

const port = 3032;

const Authrouter = require("./routes/AuthRouter");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain)*/
app.use(cors())

const db = require("./config");

db.mongoose.connect(db.url, db.options)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


app.use("/", Authrouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;