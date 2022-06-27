const express = require("express");
const app = express();

require('events').EventEmitter.defaultMaxListeners = 15;

const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3031;

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;