const express = require("express");
const DeliverymanModel = require("../../models/Deliveryman").model;
const router = express.Router();

router.post("/:id", async(req, res) => {
    try {
        let deliveryman = new DeliverymanModel({
            "Lastame": "Gonzalès",
            "Firstname": "Speedy",
            "Phone": "0645627896",
            "belongs_to": req.params.id,
            "ProfileImg": "Photo de profil",
            "Open_to_work": true,
            "Free": true,
            "AccountName": "M. Speedy Gonzalès",
            "IBAN": "FR15 1245 1562 1544 80",
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
        let deliveryman = await DeliverymanModel.findById(req.params.id)
            .populate('belongs_to');
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

router.put("/:id", async (req, res) => {
    try {
        DeliverymanModel.findOneAndUpdate({_id: req.params.id}, req.body.data).then(
            () => {
                res.status(204).json({
                    message: 'Deliveryman updates successfully'
                })
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }

})

router.delete("/:id", async(req, res) => {
    try {
        DeliverymanModel.findByIdAndDelete(req.params.id).then(() => {
            res.status(204).json({
                message: 'Deliveryman deleted successfully!'
            });
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
})

module.exports = router;
