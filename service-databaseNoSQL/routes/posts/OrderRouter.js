const express = require("express");
const OrderModel = require("../../models/Order")
const ClientModel = require("../../models/Client").model
const ArticleModel = require("../../models/Article");
const MenuModel = require("../../models/Menu");
const router = express.Router();

router.post("/:id", async (req, res) => {
    try {
        let client = await ClientModel.findById(req.params.id).exec();
        let restaurant = {_id: "62b04d2058f414638a677ce9"};
        let menus = await MenuModel.find({}).select('_id').exec()
        let articles = await ArticleModel.find({}).select('_id').exec()
        let order = new OrderModel({
                N_Order: "0012BON",
                State: 1, //0 En attente de validation / 1 En préparation / 2 Prête et en attente du livreur / 3 En livraison / 4 Livrée
                Payment: "CB",
                Restaurant: restaurant._id,
                Rating: null,
                Client: {
                    Client_ID: client,
                    Favorite: true,
                },
                Complementary: "",
                Detail: {
                    Price: 19,
                    Menus: null,
                    Articles: ["62b1f0f2259c5c3129f2038f", "62b0ba0402b85723b2dd78ea", "62b1f1b8259c5c3129f20392", "62b1f1b8259c5c3129f20392"],
                },
                CheckTime: {
                    Created_at: "2022-06-21T20:10:30.000+00:00",
                    Accepted_at: "2022-06-21T20:30:30.000+00:00",
                    Ready_at: null,
                    Pickedup_at: null,
                    Delivered_at: null,
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
        let ordersToAcceptByDeliveryman = await OrderModel.find({State: 5})
            .populate('Client.Client_ID').exec();
        let ordersToAcceptByRestaurant = await OrderModel.find({State: 0}).exec();
        let ordersToPrepare = await OrderModel.find({State: 1}).exec();
        let ordersToDeliver = await OrderModel.find({State: 2}).exec();
        let ordersInDelivery = await OrderModel.find({State: 3}).exec();
        let ordersOver = await OrderModel.find({State: 4}).exec();
        let ordersRefused = await OrderModel.find({State: 6}).exec();
        res.status(200).json({
            ordersToAcceptByDeliveryman,
            ordersToAcceptByRestaurant,
            ordersToPrepare,
            ordersToDeliver,
            ordersInDelivery,
            ordersOver,
            ordersRefused,
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
        let order = await OrderModel.findById(req.params.id)
            .populate('Client.Client_ID', 'Address Phone Name Firstname')
            .populate('Restaurant', 'Address')
            .populate('Detail.Menus', 'Name Articles Price _id')
            .populate('Detail.Menus.Articles', 'Name')
            .populate('Detail.Articles', 'Name Price').exec();
        if (order) {
            res.status(200).json({
                status: 200,
                data: order,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
})

router.get('/deliverymanCurrentOrder/:id', async (req, res) => {
    try {

        let order = await OrderModel.findOne({
            Deliveryman_token: req.params.id,
            $or: [{State: 0}, {State: 1}, {State: 2}, {State: 3}]
        })
        console.log(order)
        if (order) {
            res.status(200).json({
                    order,
                }
            )
        } else {
            res.status(204).json({
                message: 'Not found'
            })
        }

    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }

});

router.put("/:id", async (req, res) => {
    try {
        OrderModel.updateOne({_id: req.params.id}, req.body.data).then(
            () => {
                res.status(204).json({
                    message: 'Order updated successfully!'
                });
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
})


module.exports = router;
