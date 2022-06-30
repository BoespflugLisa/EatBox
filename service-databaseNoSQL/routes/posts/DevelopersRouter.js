const express = require("express");
const DeveloperModel = require("../../models/Developer").model;
const router = express.Router();

router.post("/:id", async(req, res) => {
    try {
        let developer = new DeveloperModel({
            Name: req.body.Lastname,
            Firstname: req.body.Name,
            Phone: req.body.Phone,
            belongs_to: req.params.id,
        });

        developer = await developer.save();
        res.status(200).json({
            developer,
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
        let developers = await DeveloperModel.find();
        res.status(200).json({
            developers,
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
        let developer = await DeveloperModel.findById(req.params.id).populate('belongs_to', "Email");
        if (developer) {
            res.status(200).json({
                developer,
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
        DeveloperModel.findByIdAndUpdate(req.params.id, req.body.data).then(
            () => {
                res.status(204).json({
                    message: 'Developer updates successfully'
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
        DeveloperModel.findByIdAndDelete(req.params.id).then(() => {
            res.status(204).json({
                message: 'Account deleted successfully!'
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
