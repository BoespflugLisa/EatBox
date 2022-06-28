const express = require("express");
const NotificationModel = require("../../models/Notification")
const mongoose = require("mongoose");

const router = express.Router();

let wsNotificationClients = [];

router.post("/:id/:action", async (req, res) => {
    try {
        let notification = new NotificationModel({
                "Date": new Date(),
                "Read": false,
                "belongs_to": new mongoose.Types.ObjectId(req.params.id),
                "Types": {
                    "Command": req.body.data.Types.Command,
                    "Delivery": req.body.data.Types.Delivery,
                },
            }
        );
        if (notification.Types.Command === true) {
            switch (req.params.action) {
                case "newOrder":
                    notification.Message = "Nouvelle Commande!";
                    break;
                case "canceledOrder":
                    notification.Message = "La commande a été annulée.";
                    break;
                case "orderLate":
                    notification.Message = "Vous êtes en retard sur cette commande.";
                    break;
                case "orderIsComming":
                    notification.Message = "Votre commande arrive!";
                    break;
            }
        } else if (notification.Types.Delivery === true) {
            switch (req.params.action) {
                case "DeliverymanIsLate":
                    notification.Message = "Le livreur est en retard.";
                    break;
                case "DeliverymanIsComming":
                    notification.Message = "Le livreur est arrivé !";
                    break;
                case "NoDeliverymanAvailable":
                    notification.Message = "Aucun livreur n'est disponible dans votre secteur";
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

router.get("/restaurant/:id", async (req, res) => {
    try {
        let notifications = await NotificationModel.find({
            belong_to: new mongoose.Types.ObjectId(req.params.id),
            Read: false
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

router.get("/:id", async (req, res) => {
    try {
        let notification = await NotificationModel.findOne({
            _id: req.params.id,
        });
        if (notification) {
            res.status(200).json({
                status: 200,
                data: notification,
            });
        }
        res.status(400).json({
            status: 400,
            message: "La notification n'a pas été trouvé.",
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

router.put("/restaurant/:id/readAll", async (req, res) => {
    try {
        NotificationModel.updateMany({
            belong_to: new mongoose.Types.ObjectId(req.params.id),
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

router.ws('/socket/:id', function (ws, req) {

    ws.id = req.params.id
    wsNotificationClients.push({
        "id": ws.id,
        "websocket": ws
    });

    ws.on('close', function() {
        console.log(req.params.id)
    })

    NotificationModel.watch().on('change', (data) => {

        if (data.operationType === "insert") {
            ws.send(JSON.stringify(data))
        }
    })
});

module.exports = router;