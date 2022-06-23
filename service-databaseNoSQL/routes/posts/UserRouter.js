const express = require("express");
const UserModel = require("../../models/User")
const mongoose = require("mongoose");
const router = express.Router();

//https://mongoosejs.com/docs/populate.html#populate-virtuals

router.post("/", async (req, res) => {
    try {
        const newid = new mongoose.Types.ObjectId();
        let user = new UserModel({
            _id : newid,
            Mail: "GrosvenorBonnet@rhyta.com",
            //MDP
            Type: {
                Manager : {
                    rid : ``,
                    sponsors : [],
                    sponsored : [],
                },
                Deliveryman : {
                    lid : ``,
                    sponsors : [],
                    sponsored : [],
                    Phone: "",
                },
                Client : {
                    uid : `U${newid}`,
                    sponsors : [],
                    sponsored : [],
                    Phone: "0236985944",//"+33645896510",
                },
                Developer : {
                    did : ``,
                    sponsors : [],
                    sponsored : [],
                    Phone: "",
                },
            },
        });
        console.log(user)
        user = await user.save();
        res.status(200).json({
            user,
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
            users,
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
                user,
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
