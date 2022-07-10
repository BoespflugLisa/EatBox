const express = require("express");
const LogConnectionModel = require("../../models/LogConnection").model;
const router = express.Router();

router.post("/:id", async(req, res) => {
    try {
        let logConnection = new LogConnectionModel({
            Datetime : Date.now(),
            belongs_to: req.params.id,
        });

        logConnection = await logConnection.save();
        res.status(200).json({
            logConnection,
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
        let logsConnection = await LogConnectionModel.find();
        res.status(200).json({
            logsConnection,
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
});

module.exports = router;
