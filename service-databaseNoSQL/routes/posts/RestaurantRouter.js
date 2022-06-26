const express = require("express");
const RestaurantModel = require("../../models/Restaurant")
const UserModel = require("../../models/User")
const router = express.Router();
const MenuModel = require("../../models/Menu")
const ArticleModel = require("../../models/Article")

router.post("/:id", async (req, res) => {
    try {
        let manager = await UserModel.findById(req.params.id).exec();
        let restaurant = new RestaurantModel({
            "Name": "Taco Bruno",
            "Phone": "0660606060",
            "Mail": "taco-bruno@encanto.fr",
            "Type": "Fast-Food",
            "belongs_to": manager._id,
            "Address": {"Number": "3", "Street": "rue des fleurs", "Town": "Encanto", "Code": "12345"},
            "Legal": {"AccountName": "M. Bruno Madrigal", "IBAN": "FR15 1245 1562 1544 80", "SIRET": "12 12354564", "BIC": "DAAE FR PP CCT"},
            "hours": {
                "monday": { isOpen: false, isSecondTimeRange: false, startHour: null, endHour: null, startHour2: null, endHour2: null },
                "tuesday": { isOpen: true, isSecondTimeRange: true, startHour: "11:30", endHour: "14:30", startHour2: "18:30", endHour2: "23:30" },
                "wednesday": { isOpen: true, isSecondTimeRange: true, startHour: "11:30", endHour: "14:30", startHour2: "18:30", endHour2: "23:30" },
                "thursday": { isOpen: true, isSecondTimeRange: true, startHour: "11:30", endHour: "14:30", startHour2: "18:30", endHour2: "23:30" },
                "friday": { isOpen: true, isSecondTimeRange: true, startHour: "11:30", endHour: "14:30", startHour2: "18:30", endHour2: "23:30" },
                "saturday": { isOpen: true, isSecondTimeRange: true, startHour: "11:30", endHour: "14:30", startHour2: "18:30", endHour2: "23:30" },
                "sunday": { isOpen: true, isSecondTimeRange: false, startHour: "11:30", endHour: "14:00", startHour2: null, endHour2: null },
            },
            "Preference": { NotificationCommand: Boolean, NotificationDeliveryman: Boolean, NotificationActivities: Boolean },
        });

        if(!restaurant.populated('belongs_to')){
            await restaurant.populate('belongs_to')
                .then(p=>console.log(p))
                .catch(error=>console.log(error));
        }
        restaurant = await restaurant.save();
        res.status(200).json({
            restaurant,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
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
        let restaurant = await RestaurantModel.findOne({
            _id: req.params.id,
        });
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

module.exports = router;
