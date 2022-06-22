"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const port = 3032;

//const db = new DB("sqlitedb")
const app = express();

const Authrouter = require("./routes/AuthRouter");
Authrouter.use(bodyParser.urlencoded({ extended: false }));
Authrouter.use(bodyParser.json());

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain)
//app.use(cors())

const db = require("./config");
db.mongoose.connect(db.dbUrl, db.options, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
});

app.use("/users", Authrouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;