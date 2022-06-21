const express = require("express");
const StatsModel = require("../../models/Stats");
const RestaurantModel = require("../../models/Restaurant")
const OrderModel = require("../../models/Order")
const router = express.Router();

async function getGrouped(id) {
    //let orders = await OrderModel.findById(id).exec();
    OrderModel.findOne(id, '_id', function (err, order) {
        StatsModel.aggregate([
            {$match: {belongs_to: {$in: order.made_by}}},
            {
                $group: {
                    _id: order._id,
                    meannotes: {$avg: '$Rating'},
                    nborders: {$sum: 1},
                    benefits: {$sum: '$Price'}
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
        let restaurant = await RestaurantModel.findById(req.params.id).exec();
        //let stats = getGrouped(req.params.id)
        let stat = new StatsModel({
            belongs_to: restaurant._id,
            Date: new Date(),
            MeanNotes: 3.2,//stats.meannotes,
            NbOrders: 16,//stats.nborders,
            Benefit: 45115.25,//stats.benefits,
            //NewFave : stats,
        })
        await stat.save();
        res.status(200).json({
            stat,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        let stats = await StatsModel.find().populate('belongs_to', 'Name').exec();
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
        let stat = await StatsModel.findOne({
            type: req.params.id,
        }).populate('belongs_to', 'Name').exec();
        if (stat) {
            res.status(200).json({
                stat,
            });
        }

    } catch (err) {
        res.status(400).json({
            status: 400,
            message: "La commande n'a pas été trouvé.",
        });
    }
})

router.put("/:id", async (req, res) => {
    try {
        let stats = getGrouped(req.params.id)
        let newstats = {
            Date: new Date(),
            MeanNotes: stats.meannotes,
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
