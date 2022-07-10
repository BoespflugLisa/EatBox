import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");

const app = express()


const port = 3037;


app.use(cors({
    origin: ["http://localhost:3000"]
}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}))

const RestaurantRouter = require("./routes/RestaurantRouter");
app.use("/users/restaurants", RestaurantRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;
