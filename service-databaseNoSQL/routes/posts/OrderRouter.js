const express = require("express");
const OrderModel = require("../../models/Order")
const router = express.Router();

router.post("/:id", async (req, res) => {
    try {
        let order = new OrderModel({
                N_Order: req.body.data.N_Order,
                State: req.body.data.State, //0 En attente de validation / 1 En préparation / 2 Prête et en attente du livreur / 3 En livraison / 4 Livrée / 5 Acceptée par le livreur / 6 Annulée
                Payment: req.body.data.Payment,
                Restaurant: req.body.data.Restaurant,
                Rating: req.body.data.Rating,
                Client: req.body.data.Client,
                Complementary: req.body.data.Complementary,
                Detail: {
                    Price: req.body.data.Detail.Price,
                    Menus: req.body.data.Detail.Menus,
                    Articles: req.body.data.Detail.Articles,
                    Paid: req.body.data.Detail.Paid,
                },
                CheckTime: {
                    Created_at: req.body.data.CheckTime.Created_at,
                    Accepted_at: req.body.data.CheckTime.Accepted_at,
                    Ready_at: req.body.data.CheckTime.Ready_at,
                    Pickedup_at: req.body.data.CheckTime.Pickedup_at,
                    Delivered_at: req.body.data.CheckTime.Delivered_at,
                    Cancelled_at: req.body.data.CheckTime.Cancelled_at,
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
        let orders = await OrderModel.find().exec();
        let ordersToAcceptByDeliveryman = await OrderModel.find({State: 5})
            .populate('Client').exec();
        let ordersToAcceptByRestaurant = await OrderModel.find({State: 0}).exec();
        let ordersToPrepare = await OrderModel.find({State: 1}).exec();
        let ordersToDeliver = await OrderModel.find({State: 2}).exec();
        let ordersInDelivery = await OrderModel.find({State: 3}).exec();
        let ordersOver = await OrderModel.find({State: 4})
            .populate('Client').exec();
        let ordersRefused = await OrderModel.find({State: 6}).exec();
        res.status(200).json({
            orders,
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
            .populate('Client', 'Address Phone Name Firstname Phone')
            .populate('Restaurant', 'Address Name')
            .populate('Detail.Menus', 'Name Articles Price _id')
            .populate('Detail.Menus.Articles', 'Name')
            .populate('Detail.Articles', 'Name Price').exec();
        if (order) {
            res.status(200).json({
                order,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

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

router.get("/client/:id", async (req, res) => {
    try {
        let currentOrders = await OrderModel.find({
            Client: req.params.id,
            $or: [{State: 0}, {State: 1}, {State: 2}, {State: 3}, {State: 5}]
        })

        res.status(200).json({
            currentOrders,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})


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

router.ws('/socket/:type/:id', async function (ws, req) {
    ws.id = req.params.id;
    ws.type = req.params.type;
    console.log('connected')

    OrderModel.watch().on('change', async (data) => {
        if (data.operationType === "insert" && (ws.type === 'Livreur' || ws.type === "Commercial")) {
            console.log('true')
            ws.send("New order");
        } else if (data.operationType === "update") {
            let order = await OrderModel.findById(data.documentKey._id)
            switch (order.State) {
                case 0:
                    if (ws.id === order.Client.toString() || ws.id === order.Restaurant.toString() || ws.type === "Commercial")
                        ws.send("Order updated");
                    break;

                case 1:
                case 4:
                    if (ws.id === order.Client.toString() || ws.type === "Commercial")
                        ws.send("Order updated");
                    break;

                case 2:
                case 3:
                    if (ws.id === order.Client.toString() || ws.id === order.Deliveryman_token || ws.type === "Commercial")
                        ws.send("Order updated");
                    break;

                case 6:
                    if (ws.id === order.Client.toString() || ws.id === order.Restaurant.toString() || ws.id === order.Deliveryman_token || ws.type === "Commercial")
                        ws.send("Order refused");
                    break;

            }
            if (ws.id === order.Client.toString() || ws.id === order.Restaurant.toString() || ws.id === order.Deliveryman_token || ws.type === "Commercial") {
                ws.send("Order update");
            }
        }
    })
});

module.exports = router;
