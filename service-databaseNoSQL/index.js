const express = require("express");
const app = express();
const expressWs = require('express-ws')(app);

const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./swagger.json");

require('events').EventEmitter.defaultMaxListeners = 15;


const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = 3031;


app.use(logger("dev"));
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


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
);

const ClientsRouter = require("./routes/posts/ClientRouter");
const DeliverymansRouter = require("./routes/posts/DeliverymanRouter");
const StatsRouter = require("./routes/posts/StatsRouter");
const PerformancesRouter = require("./routes/posts/PerformanceRouter");
const DevelopersRouter = require("./routes/posts/DevelopersRouter");
const LogsConnectionRouter = require("./routes/posts/LogsConnectionRouter");

app.use("/stats", StatsRouter);
app.use("/performance", PerformancesRouter);
app.use("/deliverymans", DeliverymansRouter);
app.use("/clients", ClientsRouter);
app.use("/developers", DevelopersRouter);
app.use("/logs", LogsConnectionRouter);


app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;

//https://stackoverflow.com/questions/34327599/using-express-js-to-consume-an-api
