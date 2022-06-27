const express = require("express");
const NotificationModel = require("../../models/Notification")
const {now} = require("mongoose");
const router = express.Router();

router.post("/:id/:action", async (req, res) => {
    try {
        let notification = new NotificationModel({
                "Date": "2022-06-21T19:10:30.000+00:00",
                "Read": false,
                "belongs_to": req.params.id,
                "Types": {
                    "Command": false,
                    "Activity": true,
                    "Delivery": false,
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
        }
        else if (notification.Types.Delivery === true) {
            switch (req.params.action) {
                case "DeliverymanIsLate":
                    notification.Message = "Le livreur est en retard.";
                    break;
                case "DeliverymanIsComming":
                    notification.Message = "Le livreur est arrivé!";
                    break;
                case "NoDeliverymanAvailable":
                    notification.Message = "Aucun livreur n'est disponible dans votre secteur";
                break;
            }
        }
        else if (notification.Types.Activity === true) {
            switch (req.params.action) {
                case "newClients":
                    notification.Message = "Vous avez été sélectionné comme favori";
                    break;
                case "tresholdTenClients":
                    notification.Message = "Vous avez séduit 10 clients";
                /*case "tresholdClients":
                    return notification.Message = "Vous avez séduit " + {{req.body.treshold}} + " client";*/
                /*case "tresholdOrders":
                    return notification.Message = "Vous avez vendu " + {{req.body.treshold}} + " commandes";*/
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

router.ws('/echo', function(ws, req) {
    NotificationModel.watch().on('change', (data) => {
        console.log(data)
        ws.send(JSON.stringify(data))
    })
});

module.exports = router;