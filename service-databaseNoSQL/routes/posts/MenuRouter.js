const express = require("express");
const MenuModel = require("../../models/Menu")
const RestaurantModel = require("../../models/Restaurant").model;
const ArticleModel = require("../../models/Article")
const router = express.Router();


router.post("/:id", async (req, res) => {
    try {
        let restaurant = await RestaurantModel.findById(req.params.id).exec();
        let articles = await ArticleModel.find({}).select('_id').exec()
        let menu = new MenuModel({
            made_by: restaurant._id,
            Name: "Special Burger",
            Image: "data://image.png",
            Description: "Le menu le plus appétissant qui existe",
            Price: 9.50,
            Available: true,
            Articles: articles,
            Promotions: {
                UnPour2: false,
                Remise: {
                    5: false,
                    10: false,
                    15: false,
                    20: false,
                },
            },
        })
        if (!menu.populated('made_by')) {
            await menu.populate('made_by Articles')
                .then(p => console.log(p))
                .catch(error => console.log(error));
        }
        menu = await menu.save();
        console.log(menu)
        res.status(200).json({
            message: "Le menu a été créé.",
            menu,
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
        let menus = await MenuModel.find();
        res.status(200).json({
            menus,
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
        let menu = await MenuModel.findById(req.params.id)
            .populate('Articles', 'Name').exec();
        if (menu) {
            res.status(200).json({
                menu,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})

router.put("/:id", async (req, res) => {
    const filter = {connected: 'true', _id: req.params.id};

    try {
        let menu = await MenuModel.findOne(filter, update, {new: true})

        if (menu) {
            res.status(200).json({
                menu,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})

module.exports = router;
