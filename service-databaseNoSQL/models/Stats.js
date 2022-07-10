const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StatsSchema = new Schema(
    {
        belongs_to: {type: Schema.Types.ObjectId, ref: 'RestaurantModel'},
        Date: Schema.Types.Date,
        MeanNotes: Number,
        NbOrders: Number,
        Benefit: Number,
        NewFave: Number,
    }
);

let Stats = mongoose.model("StatModel", StatsSchema, "stats");

module.exports = Stats;
