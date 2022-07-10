const express = require("express");
const NotificationModel = require("../../models/Notification")
const mongoose = require("mongoose");

const router = express.Router();


router.post("/:id", async (req, res) => {
    try {
        console.log('test')
        let notification = new NotificationModel({
                "Date": new Date(),
                "Read": false,
                "belongs_to": req.params.id,
                "Types": {
                    "Command": req.body.data.Types.Command,
                    "Delivery": req.body.data.Types.Delivery,
                },
            }
        );
        if (notification.Types.Command === true) {
            switch (req.body.data.action) {
                case "NewOrder":
                    notification.Message = "Nouvelle Commande!";
                    break;
                case "OrderAcceptedRestaurant":
                    notification.Message = "Le restaurant a accepté votre commande.";
                    break;
                case "OrderAcceptedRestaurantDelivery":
                    notification.Message = "Le restaurant a accepté votre livraison.";
                    break;
                case "OrderReady":
                    notification.Message = "Le restaurant a fini de préparer la commande.";
                    break;
                case "CanceledOrder":
                    notification.Message = "La commande a été annulée.";
                    break;
                case "OrderLate":
                    notification.Message = "Vous êtes en retard sur cette commande.";
                    break;
                case "OrderIsComming":
                    notification.Message = "Votre commande arrive!";
                    break;
                case "OrderIsFinish":
                    notification.Message = "Qu'avez vous pensé de votre commande ? Pensez à donner une note au restaurant.";
                    break;
            }
        } else if (notification.Types.Delivery === true) {
            switch (req.body.data.action) {
                case "DeliverymanIsLate":
                    notification.Message = "Le livreur est en retard.";
                    break;
                case "DeliverymanIsComming":
                    notification.Message = "Le livreur est arrivé !";
                    break;
                case "NoDeliverymanAvailable":
                    notification.Message = "Aucun livreur n'est disponible dans votre secteur";
                    break;
                case "OrderAcceptedDeliveryman":
                    notification.Message = "Un livreur est disponible pour votre commande.";
                    break;
                case "DeliverymanWillTakeOrder":
                    notification.Message = "Votre livreur va prendre en charge votre commande.";
                    break;
            }
        }

        notification = await notification.save();
        res.status(200).json({
            status: 200,
            data: notification,
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
        let notifications = await NotificationModel.find();
        res.status(200).json({
            status: 200,
            data: notifications,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        let notifications = await NotificationModel.find({
            $and: [
                {belongs_to: req.params.id},
                {Read: false}
            ]
        })

        res.status(200).json({
            status: 200,
            notifications,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get("/userCount/:id", async (req, res) => {
    try {
        let count = await NotificationModel.count({
            $and: [
                {belongs_to: req.params.id},
                {Read: false}
            ]
        })

        res.status(200).json({
            status: 200,
            count,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        let notification = await NotificationModel.findById(req.params.id);
        if (notification) {
            res.status(200).json({
                notification,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "La notification n'a pas été trouvé.",
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        NotificationModel.findByIdAndUpdate(req.params.id, req.body.data).then(() => {
                res.status(204).json({
                    message: 'Notification updates successfully'
                })
            }
        )
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.put("/user/:id/readAll", async (req, res) => {
    try {
        NotificationModel.updateMany({
            belong_to: req.params.id,
            Read: false
        }, {
            $set: {Read: true}
        }).then(() => {
            res.status(204).json({
                message: 'Notifications updates successfully'
            })
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

router.ws('/socket/notifications/:id', function (ws, req) {
    ws.id = req.params.id

    NotificationModel.watch().on('change', (data) => {
        if (data.operationType === "insert") {
            if (ws.id === data.fullDocument.belongs_to.toString()) {
                ws.send("New notification");
            }
        }
    })
});

module.exports = router;