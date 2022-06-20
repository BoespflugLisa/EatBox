const express = require("express");
const UserModel = require("../../models/User")
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newid = new mongoose.Types.ObjectId();
        let user = new UserModel({
            _id : newid,
            Mail: "tacosbruno@encanto.fr",
            //MDP
            Type: {
                Manager : {
                    rid : `R${newid}`,
                    sponsors : [],
                    sponsored : [],
                },
                Deliveryman : {
                    lid : `L${newid}`,
                    sponsors : [],
                    sponsored : [],
                    Phone: "",
                },
                Client : {
                    uid : `U${newid}`,
                    sponsors : [],
                    sponsored : [],
                    Phone: "",//"+33645896510",
                },
                Developer : {
                    did : `D${newid}`,
                    sponsors : [],
                    sponsored : [],
                    Phone: "",
                },
            },
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

router.put("/", async(req, res) => {
    try {

    } catch(e){

    }
})

module.exports = router;
