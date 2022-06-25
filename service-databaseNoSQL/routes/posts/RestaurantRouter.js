const express = require("express");
const RestaurantModel = require("../../models/Restaurant")
const router = express.Router();

router.post("/:id", async (req, res) => {
    try {
        let restaurant = new RestaurantModel({
            Name: req.body.Username,
            Type: req.body.Type,
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
            Address: {Number: "", Street: "", Town: "", Code: ""},
            Phone: req.body.Phone,
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
        }).populate('belongs_to')
            .then(p => console.log(p))
            .catch(error => console.log(error));

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

router.put("/:id", async (req, res) => {
    try {
        RestaurantModel.updateOne({_id: req.params.id}, req.body.data).then(
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

module.exports = router;
