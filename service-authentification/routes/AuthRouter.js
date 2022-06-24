const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')
const UserModel = require('../models/User')
const router = express.Router();
const utils = require('../ExternCalls.js')


// Register
router.post('/register', async function (req, res) {
    let newUser = new UserModel({
        Username : req.body.username,
        Email : req.body.email,
        Password : bcrypt.hashSync(req.body.password, 8),
        Phone : req.body.phone,
        Type : req.body.type,
        Role : req.body.role,
        Legal : {
            SIRET: req.body.legal.siret,
            IBAN: req.body.legal.iban,
        }
    });


    try {
        let r = await UserModel.findOne({Email: req.body.email}).exec().then(r => {
                        return r;
        })
        if (r!=null) {
            console.log("Already existing: ",r)
            throw "un utilisateur est déjà enregistré sous cet email"
        }



        newUser.save()
            .then(function (r) {
                let token = jwt.sign(
                    {id: newUser._id},
                    config.secret,
                    {expiresIn: 86400} //24h
                )
                res.status(200).json({
                    auth: true,
                    token: token,
                    user : newUser,
                });
            });
        utils.createProfile(newUser).then(r => console.log("CreateProfile: ", r))
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err,
        })
        return res
    }

});

router.post('/login', async (req, res) => {
    //https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router
    let user = new UserModel()
    try {
        user = await UserModel.findOne({Email: req.body.email}).then(r => {
            return r;
        })

        let pwdIsValid = false

        if(user.Password){
            pwdIsValid = bcrypt.compareSync(req.body.password, user.Password);
        }
        console.log(user)

        if (user===null || !pwdIsValid) {
            throw "Aucun utilisateur avec ce couple email/mot de passe n'a été trouvé"
        }


        let token = jwt.sign(
            {id: user._id},
            config.secret,
            {expiresIn: 86400} //24h
        );
        res.status(200).json({
            auth: true,
            token: token,
            user: user,
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err,
        })
        return res
    }
});

router.get('/', function (req, res) {
    UserModel.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

router.get('/:token', function (req, res) {
    UserModel.findOne({UserId: req.params.token}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

router.delete('/:id', function (req, res) {
    UserModel.remove({UserId: req.params.id}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
