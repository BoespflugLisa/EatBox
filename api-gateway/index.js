const express = require("express");

const {ROUTES} = require("./routes.js")

const {setupLogging} = require("./logging");
const {setupProxies} = require("./proxy");

const app = express()
const port = 3000;

setupLogging(app);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log("Runnning on " + port);
})