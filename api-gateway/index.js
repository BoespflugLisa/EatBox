const express = require("express");
const cors = require("cors");

const {ROUTES} = require("./routes.js")

const {setupLogging} = require("./logging");
const {setupProxies} = require("./proxy");

const app = express()
const port = 3000;

let allowedOrigins = ['http://localhost:8080', '*'];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);}
}));

setupLogging(app);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log("Runnning on " + port);
})