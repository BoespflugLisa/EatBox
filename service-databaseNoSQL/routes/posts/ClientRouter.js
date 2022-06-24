const express = require("express");
const ClientModel = require("../../models/Client");
const UserModel = require("../../models/User");
const router = express.Router();

router.post("/:id", async(req, res) => {
    try {
        let clientUser = await UserModel.findById(req.params.id).exec();
        let client = new ClientModel({
            "Name": "Bonnet",
            "Firstname": "Grosvenor",
            "belongs_to": clientUser._id,
            "Picture": "Photo de profil",
            "Address": {"Number": "86", "Street": "rue Cazade", "Town": "DREUX", "Code": "28100"},
        });

        client = await client.save();
        res.status(200).json({
            status: 200,
            data: client,
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
        let clients = await ClientModel.find();
        res.status(200).json({
            clients,
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
        let client = await ClientModel.findById(req.params.id).exec();
        if (client) {
            res.status(200).json({
                client,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
})

module.exports = router;
