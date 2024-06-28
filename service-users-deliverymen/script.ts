import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");

const app = express()


const port = 3040;


app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}))

const DeliverymanRouter = require("./routes/DeliverymanRouter");
app.use("/users/deliverymen", DeliverymanRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;
