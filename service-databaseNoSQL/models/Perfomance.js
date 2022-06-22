const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PerformancesSchema = new Schema(
    {
        Type : String, //microservice ou serveur
        Response_Time : Number,
        Request : {
            Type : String, //GET, POST, PUT, DELETE, ...
            Date : Date,
            Status : Number,
        },
        Parts : {
            CPU : String,
            RAM : String,
            memory_usage : String,
        }
    }
);

let Performances = mongoose.model("PerformanceModel", PerformancesSchema, "performances");

module.exports = Performances;
