const express = require("express");
const UserRouter = require("../../models/User")
const router = express.Router();

router.post("/", async(req, res) => {
    try {
        let user = new UserRouter(req.body);
        user = await user.save();
        res.status(200).json({
            status:200,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        let users = await UserRouter.find();
        res.status(200).json({
            status: 200,
            data: users,
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
        let user = await UserRouter.findOne({
            _id: req.params.id,
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
            message : err.message,
        })
    }
})

module.exports = router;
