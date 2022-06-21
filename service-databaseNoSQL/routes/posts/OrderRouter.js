const express = require("express");
const OrderModel = require("../../models/Order")
const router = express.Router();

router.post("/:clientid", async (req, res) => {
    try {
        let client = "";
        let restaurant = "";
        let menus = "";
        let articles = "";
        let order = new OrderModel({N_Order : "String",
                State : 0, //0 En attente / 1
                Payment : "CB",
                Restaurant : restaurant._id,
                Client : {
                    Client_ID : client._id,
                    Favorite : true,
                },
                Complementary : "Attention, je suis allergique.",
                Detail : {
                    Price : 31.5,
                    Menus : {type: [Schema.Types.ObjectId], ref:"MenuModel"},
                    Articles : {type: [Schema.Types.ObjectId], ref:"ArticleModel"},
                },
                Time : {
                    Created_at : Date,
                    Accepted_at : Date,
                    Pickedup_at: Date,
                    Delivered_at: Date,
                },
            }
        );
        console.log(order)
        order = await order.save();
        res.status(200).json({
            order,
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
            orders,
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
