const express = require("express");
const UserModel = require("../../models/User")
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let user = new UserModel({
            Mail: "tacosbruno@encanto.fr",
            Phone: "",
        });
        console.log(user)
        user = await user.save();
        res.status(200).json({
            status: 200,
            data: user,
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
        let users = await UserModel.find();
        res.status(200).json({
            status: 200,
            data: users,
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
        let user = await UserModel.findOne({
            type: req.params.id,
        });
        if (user) {
            res.status(200).json({
                status: 200,
                data: user,
            });
        }
        res.status(400).json({
            status: 400,
            message: "Le user n'a pas été trouvé.",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})

module.exports = router;
