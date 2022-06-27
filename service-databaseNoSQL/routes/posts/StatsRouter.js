const express = require("express");
const StatsModel = require("../../models/Stats");
//const RestaurantModel = require("../../models/Restaurant").model
const OrderModel = require("../../models/Order")
const mongoose = require("mongoose");
const router = express.Router();

async function getDetails(id) {
    let result = OrderModel.aggregate([
            {$unwind: '$Detail'},
            {$unwind: '$CheckTime'},
            {
                $match: {
                    Restaurant: new mongoose.Types.ObjectId(id),
                    $and: [
                        {$expr: {$eq: [{"$month": "$CheckTime.Created_at"}, new Date().getMonth() + 1]}},
                        {$expr: {$eq: [{"$year": "$CheckTime.Created_at"}, new Date().getFullYear()]}},
                    ]
                }
            },
            {
                $facet: {
                    "Menus": [
                        {$unwind: '$Detail.Menus'},
                        {$match: {"Detail.Menus": {$exists: 1}}},
                        {$sortByCount: '$Detail.Menus'},
                        {$limit: 3}
                    ],

                    "Articles": [
                        {$unwind: '$Detail.Articles'},
                        {$match: {"Detail.Articles": {$exists: 1}}},
                        {$sortByCount: '$Detail.Articles'},
                        {$limit: 2}
                    ],

                    "Ratings": [
                        {$match: {Rating: {$exists: 1}}},
                        {
                            $bucket: {
                                groupBy: '$Rating',
                                boundaries: [0, 0.9, 1, 1.9, 2, 2.9, 3, 3.9, 4, 4.9, 5, 5.1],
                                output: {
                                    count: {$sum: 1}
                                }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "articles",
                    localField: "Articles._id",
                    foreignField: "_id",
                    as: "articles"
                }
            },
            {
                $lookup: {
                    from: "menus",
                    localField: "Menus._id",
                    foreignField: "_id",
                    as: "menus"
                }
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return {}

            } else {
                return result
            }
        }
    )

    return result
}

async function getGrouped(id, current = false) {
    let match = {Restaurant: new mongoose.Types.ObjectId(id)}

    if (current) {
        match = {
            Restaurant: new mongoose.Types.ObjectId(id),
            $and: [
                {$expr: {$eq: [{"$month": "$CheckTime.Created_at"}, new Date().getMonth() + 1]}},
                {$expr: {$eq: [{"$year": "$CheckTime.Created_at"}, new Date().getFullYear()]}},
            ]
        }
    }

    let result = OrderModel.aggregate([
        {$unwind: "$Detail"},
        {$unwind: "$CheckTime"},
        {
            $match: match
        },
        {
            $group: {
                _id: {
                    Restaurant: "$Restaurant",
                    month: {$month: "$CheckTime.Created_at"},
                    year: {$year: "$CheckTime.Created_at"}
                },
                meannotes: {$avg: '$Rating'},
                nborders: {$sum: 1},
                benefits: {$sum: '$Detail.Price'},
            }
        },
        {$project : {_id: new mongoose.Types.ObjectId(id)}}
    ], function (err, result) {
        if (err) {
            console.log(result);
            return {_id: new mongoose.Types.ObjectId(id), meannotes: null, nborders: 0, benefits: 0}

        } else {
            console.log(result);
            return result;
        }
    })
    return result
}

router.post("/:id", async (req, res) => {
    try {
        //let stats = getGrouped(req.params.id)
        let stat = new StatsModel({
            belongs_to: req.params.id,
            Date: new Date(),
            MeanNotes: null,//stats.meannotes,
            NbOrders: 0,//stats.nborders,
            Benefit: 0,//stats.benefits,
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

/*GET current month stats*/
router.get("/:id", async (req, res) => {
    try {
        let stats = await getGrouped(req.params.id, true).then(r => {
            return r[0]
        })
        //console.log(stats)

        let articlesDetails = await getDetails(req.params.id).then(result => {


            //console.log(result[0])
            const sortable1 = result[0].Menus.map((x, index) => {
                if (x) {
                    return {_id: x._id, count: x.count, name: result[0].menus[index].Name}
                }

            }).concat(result[0].Articles.map((x, index) => {
                if (x) {
                    return {_id: x._id, count: x.count, name: result[0].articles[index].Name}
                }
            }))


            const sortable2 = [
                result[0].Ratings[result[0].Ratings.findIndex(x => {
                    if (x.count && x._id === 0) return x.count; else return undefined
                })],

                result[0].Ratings[result[0].Ratings.findIndex(x => {
                    if (x.count && x._id === 1) return x.count; else return undefined
                })],
                result[0].Ratings[result[0].Ratings.findIndex(x => {
                    if (x.count && x._id === 2) return x.count; else return undefined
                })],
                result[0].Ratings[result[0].Ratings.findIndex(x => {
                    if (x.count && x._id === 3) return x.count; else return undefined
                })],
                result[0].Ratings[result[0].Ratings.findIndex(x => {
                    if (x.count && x._id === 4) return x.count; else return undefined
                })],
                result[0].Ratings[result[0].Ratings.findIndex(x => {
                    if (x.count && x._id === 5) return x.count; else return undefined
                })],
            ]

            return {
                BestSales: sortable1,
                Ratings: {
                    0: sortable2[0] ? sortable2[0].count : null,
                    1: sortable2[1] ? sortable2[1].count : null,
                    2: sortable2[2] ? sortable2[2].count : null,
                    3: sortable2[3] ? sortable2[3].count : null,
                    4: sortable2[4] ? sortable2[4].count : null,
                    5: sortable2[5] ? sortable2[5].count : null,
                },
            }
        })

        let stat = await StatsModel.findOne({
                belongs_to: req.params.id
            }).populate('belongs_to');
        /*} else {
            stat = await new StatsModel({
                belongs_to: new mongoose.Types.ObjectId(req.params.id),
                MeanNotes: stats.meannotes,
                NbOrders: stats.nborders,
                Benefit: stats.benefits,
                //NewFave : Number,
            }).populate('belongs_to',)
        }*/

        if (stat) {
            console.log(stats)
            res.status(200).json({
                stats: articlesDetails,
                stat
            });

            console.log(res)
        } else {
            res.status(200).json({
                stat: null
            });
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            status: 400,
            message: "Vos statistiques n'ont pas été trouvées.",
        });
    }
})


/*GET all months stats history*/
router.get("/history/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        let stat = await StatsModel.find({
            belongs_to: req.params.id,
            $and: [
                {$expr: {$lt: [{"$month": "$Date"}, new Date().getMonth() + 1]}},
                {$expr: {$lte: [{"$year": "$Date"}, new Date().getFullYear()]}},
            ]

        })//.populate('belongs_to');
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
            message: "Vos statistiques n'ont pas été trouvées.",
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
