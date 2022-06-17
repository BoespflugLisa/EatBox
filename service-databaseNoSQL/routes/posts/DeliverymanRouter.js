const express = require("express");
const DeliverymanModel = require("../../models/Deliveryman");
const router = express.Router();

router.post("/", async(req, res) => {
    try {
        let deliveryman = new DeliverymanModel({
            Name: "Rabi",
            Firstname: "Jacob",
            Picture: "Photo de profil 2",
            Opentowork: true,
            Free: false,
        });
        deliveryman = await deliveryman.save();
        res.status(200).json({
            status:200,
            data: deliveryman,
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
                status: 200,
                data: deliveryman,
            });
        }
        res.status(400).json({
            status: 400,
            message: "Le livreur n'a pas été trouvé.",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
})

module.exports = router;
