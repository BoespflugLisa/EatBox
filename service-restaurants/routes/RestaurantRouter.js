const express = require("express");
const RestaurantModel = require("../models/Restaurant").model
const router = express.Router();
const MenuModel = require("../models/Menu")
const ArticleModel = require("../models/Article")
const CategoryModel = require("../models/Category").model;

router.post("/add/:id", async (req, res) => {
    try {
        let restaurant = new RestaurantModel({
            Name: req.body.Name,
            Role: "Restaurant",
            Type: req.body.Type,
            CoverImg : req.body.CoverImg,
            ProfileImg: req.body.ProfileImg,
            Legal: {AccountName: "", IBAN: req.body.Legal.IBAN, SIRET: req.body.Legal.SIRET},
            belongs_to: req.params.id,
            hours: {
                monday: {
                    isOpen: true,
                    isSecondTimeRange: true,
                    startHour: "",
                    endHour: "",
                    startHour2: "",
                    endHour2: "",
                },
                tuesday: {
                    isOpen: true,
                    isSecondTimeRange: true,
                    startHour: "",
                    endHour: "",
                    startHour2: "",
                    endHour2: "",
                },
                wednesday: {
                    isOpen: true,
                    isSecondTimeRange: true,
                    startHour: "",
                    endHour: "",
                    startHour2: "",
                    endHour2: "",
                },
                thursday: {
                    isOpen: true,
                    isSecondTimeRange: true,
                    startHour: "",
                    endHour: "",
                    startHour2: "",
                    endHour2: "",
                },
                friday: {
                    isOpen: true,
                    isSecondTimeRange: true,
                    startHour: "",
                    endHour: "",
                    startHour2: "",
                    endHour2: "",
                },
                saturday: {
                    isOpen: true,
                    isSecondTimeRange: true,
                    startHour: "",
                    endHour: "",
                    startHour2: "",
                    endHour2: "",
                },
                sunday: {
                    isOpen: true,
                    isSecondTimeRange: true,
                    startHour: "",
                    endHour: "",
                    startHour2: "",
                    endHour2: "",
                },
            },
            Address: {Number: req.body.Address.Number, Street: req.body.Address.Street, Town: req.body.Address.Town, Code: req.body.Address.Code},
            Phone: req.body.Phone,
            Preferences: {
                NotificationCommand: true,
                NotificationDeliveryman: true,
                NotificationActivities: true,
            },
        })

        //console.log("restaurant ", restaurant)
        if(!restaurant.populated('belongs_to')){
            await restaurant.populate('belongs_to')
                .then(p=>console.log(p))
                .catch(error=>console.log(error));
        }
        await restaurant.save();
        res.status(200).json({
            restaurant,
        });
    } catch (err) {
        throw err
        /*res.status(400).json({
            status: 400,
            message: err,
        })*/
    }
});

//GET tous les menus d'un restaurant
router.get("/menus/:id", async (req, res) => {
    try {
        let menu = await MenuModel.find({made_by:req.params.id})
            .populate('Articles', 'Name')
            .populate('made_by')
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


//GET tous les articles d'un restaurant
router.get("/articles/:id", async (req, res) => {
    try {
        let article = await ArticleModel.find({made_by:req.params.id})
            .populate('made_by')
            .populate('Category')
        if (article) {
            res.status(200).json({
                article,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})


//GET tous les categories d'un restaurant
router.get("/categories/:id", async (req, res) => {
    try {
        let categorie = await CategoryModel.find({belongs_to:req.params.id})
        if (categorie) {
            res.status(200).json({
                categorie,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})



router.get("/", async (req, res) => {
    try {
        let restaurants = await RestaurantModel.find();
        res.status(200).json({
            restaurants,
        });

    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        let restaurant = await RestaurantModel.findById(req.params.id)
            .populate('belongs_to')
            //.then(p => console.log(p))
            //.catch(error => console.log(error));

        if (restaurant) {
            res.status(200).json({
                status: 200,
                restaurant,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})


router.put("/update/:id", async (req, res) => {
    try {
        RestaurantModel.findOneAndUpdate({_id: req.params.id}, req.body.data).then(
            () => {
                res.status(204).json({
                    message: 'Restaurant updates successfully'
                })
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }

})

router.delete('/delete/:id', function (req, res) {
    try {
        RestaurantModel.findByIdAndDelete(req.params.id).then(() => {
            res.status(204).json({
                message: 'Restaurant deleted successfully!'
            });
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = router;
