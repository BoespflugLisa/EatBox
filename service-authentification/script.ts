import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()


const port = 3036;


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

const UsersRouter = require("./routes/AuthRouter");
app.use("/auth", UsersRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;

