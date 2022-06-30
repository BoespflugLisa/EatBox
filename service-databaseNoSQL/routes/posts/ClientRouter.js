const express = require("express");
const ClientModel = require("../../models/Client").model;
const router = express.Router();

router.post("/:id", async(req, res) => {
    try {
        let client = new ClientModel({
            Name: req.body.Lastname,
            Firstname: req.body.Name,
            Phone: req.body.Phone,
            belongs_to: req.params.id,
            Address: {Number: req.body.Address.Number, Street: req.body.Address.Street, Town: req.body.Address.Town, Code: req.body.Address.Code},
        });

        client = await client.save();
        res.status(200).json({
            client,
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
        let client = await ClientModel.findById(req.params.id).populate('belongs_to', "Email");
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

router.put("/:id", async (req, res) => {
    try {
        ClientModel.findByIdAndUpdate(req.params.id, req.body.data).then(
            () => {
                res.status(204).json({
                    message: 'Client updates successfully'
                })
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }

});

router.delete('/:id', function (req, res) {
    try {
        ClientModel.findByIdAndDelete(req.params.id).then(() => {
            res.status(204).json({
                message: 'Restaurant deleted successfully!'
            });
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = router;
