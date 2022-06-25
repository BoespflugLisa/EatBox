const express = require("express");
const StatsModel = require("../../models/Stats");
//const RestaurantModel = require("../../models/Restaurant").model
const OrderModel = require("../../models/Order")
const mongoose = require("mongoose");
const router = express.Router();

async function getGrouped(id) {
    //let orders = await OrderModel.findById(id).exec();
    OrderModel.findOne(id, 'Restaurants', await function (err, order) {
        StatsModel.aggregate([
            {$match: {belongs_to: order.Restaurant}},
            {
                $group: {
                    _id: order.Restaurant,
                    //meannotes: {$avg: '$Rating'},
                    nborders: {$sum: 1},
                    benefits: {$sum: '$Detail.$Price'}
                }
            }
        ], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                return result;
            }
        });
    })
}

router.post("/:id", async (req, res) => {
    try {
        //let restaurant = await RestaurantModel.findById(req.params.id).exec();
        //let stats = getGrouped(req.params.id)
        let stat = new StatsModel({
            belongs_to: req.params.id,
            Date: new Date(),
            MeanNotes: 0,//stats.meannotes,
            NbOrders: 2,//stats.nborders,
            Benefit: 2,//stats.benefits,
            //NewFave : stats,
        })
        await stat.save();
        res.status(200).json({
            stat,
        });
    } catch (err) {
        throw err
        /*res.status(400).json({
            status: 400,
            message: err.message,
        })*/
    }
});

router.get("/", async (req, res) => {
    try {
        let stats = await StatsModel.find().populate('belongs_to').exec();
        res.status(200).json({
            stats,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
    return 0
})

router.get("/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        let stat = await StatsModel.findOne({
            belongs_to: req.params.id
        }).populate('belongs_to');
        if (stat) {
            console.log(stat)
            res.status(200).json({
                stat,
            });
        }

    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            status: 400,
            message: "La stat n'a pas été trouvé.",
        });
    }
})

router.put("/:id", async (req, res) => {
    try {
        let stats = getGrouped(req.params.id)
        let newstats = {
            Date: new Date(),
            //MeanNotes: stats.meannotes,
            NbOrders: stats.nborders,
            Benefit: stats.benefits,
            //NewFave : stats,
        }
        console.log(newstats)
        newstats = await newstats.save();
        res.status(200).json({
            newstats,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

module.exports = router;
