import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");

const app = express()


const port = 3039;


app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}))

const DeveloperRouter = require("./routes/DeveloperRouter");
app.use("/users/developers", DeveloperRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;
