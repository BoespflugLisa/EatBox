const express = require("express");
const RestaurantModel = require("../../models/Restaurant")
const UserModel = require("../../models/User")
const router = express.Router();

router.post("/:id", async (req, res) => {
    try {
        let manager = await UserModel.findById(req.params.id).exec();
        let restaurant = new RestaurantModel({
                "Name": "Taco Bruno",
                "Type": "Fast-Food",
                "belongs_to": manager._id,
                "Address": {"Number": "3", "Street": "rue des fleurs", "Town": "Encanto", "Code": "12345"},
                "Legal": {"AccountName": "M. Bruno Madrigal", "IBAN": "FR15 1245 1562 1544 80", "SIRET": "12 12354564"},
                "Hours": {
                    "Monday": [["8", "14"], ["16", "22"]],
                    "Tuesday": [["Fermé"], ["Fermé"]],
                    "Wednesday": [["10"], ["20"]],
                    "Thursday": [[""], [""]],
                    "Friday": [[""], [""]],
                    "Saturday": [[""], [""]],
                    "Sunday": [["Fermé"], ["Fermé"]],
                }
            }
        );
        if(!restaurant.populated('belongs_to')){
            await restaurant.populate('belongs_to')
                .then(p=>console.log(p))
                .catch(error=>console.log(error));;
        }
        restaurant = await restaurant.save();
        res.status(200).json({
            status: 200,
            data: restaurant,
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
        let restaurants = await RestaurantModel.find();
        res.status(200).json({
            status: 200,
            data: restaurants,
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
            message: err.message,
        })
    }
})

module.exports = router;
