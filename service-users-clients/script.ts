import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");

const app = express()


const port = 3038;


app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}))

const ClientRouter = require("./routes/ClientRouter");
app.use("/users/clients", ClientRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;
