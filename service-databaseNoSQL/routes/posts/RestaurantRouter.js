const express = require("express");
const RestaurantRouter = require("../../models/Restaurant")
const router = express.Router();

router.post("/", async(req, res) => {
    try {
        let restaurant = new RestaurantRouter(req.body);
        restaurant = await restaurant.save();
        res.status(200).json({
            status:200,
            data: restaurant,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        let restaurants = await RestaurantRouter.find();
        res.status(200).json({
            status: 200,
            data: restaurants,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        let restaurant = await RestaurantRouter.findOne({
            _id: req.params.id,
        });
        if (restaurant) {
            res.status(200).json({
                status: 200,
                data: restaurant,
            });
        }
        res.status(400).json({
            status: 400,
            message: "Le restaurant n'a pas été trouvé.",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
})

module.exports = router;
