const express = require("express");
const OrderModel = require("../../models/Order")
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let order = new OrderModel({
        });
        console.log(order)
        order = await order.save();
        res.status(200).json({
            status: 200,
            data: order,
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
        let orders = await OrderModel.find();
        res.status(200).json({
            status: 200,
            data: orders,
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
        let order = await OrderModel.findOne({
            type: req.params.id,
        });
        if (order) {
            res.status(200).json({
                status: 200,
                data: order,
            });
        }
        res.status(400).json({
            status: 400,
            message: "La commande n'a pas été trouvé.",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})

router.put("/", async(req, res) => {
    try {

    } catch(e){

    }
})

module.exports = router;
