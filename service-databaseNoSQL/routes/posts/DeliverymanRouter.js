const express = require("express");
const DeliverymanModel = require("../../models/Deliveryman").model;
const router = express.Router();

router.post("/:id", async(req, res) => {
    try {
        let deliveryman = new DeliverymanModel({
            "Name": "Speedy",
            "Firstname": "Gonzalès",
            "belongs_to": req.params.id,
            "Picture": "Photo de profil",
            "Open_to_work": true,
            "Free": true,
        });

        deliveryman = await deliveryman.save();
        res.status(200).json({
            status: 200,
            data: deliveryman,
        });
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        let deliverymans = await DeliverymanModel.find();
        res.status(200).json({
            status: 200,
            data: deliverymans,
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
        let deliveryman = await DeliverymanModel.findOne({
            _id: req.params.id,
        });
        if (deliveryman) {
            res.status(200).json({
                 deliveryman,
            });
        }

    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
})

module.exports = router;
