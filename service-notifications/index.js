const express = require("express");
const app = express();
const expressWs = require('express-ws')(app);

require('events').EventEmitter.defaultMaxListeners = 15;

const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3033;

const NotificationsRouter = require("./routes/posts/NotificationRouter");

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use("/notifications", NotificationsRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;