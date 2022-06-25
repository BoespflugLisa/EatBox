const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')
const UserModel = require('../models/User')
const router = express.Router();
const utils = require('../ExternCalls.js')
const mongoose = require("mongoose");


// Register
router.post('/register', async function (req, res) {
    let newUser = new UserModel.model({
        Username: req.body.username,
        Email: req.body.email,
        Password: bcrypt.hashSync(req.body.password, 8),
        restaurant : null,
        livreur : null,
        client : null
    });


    try {
        let r = await UserModel.model.findOne({Email: req.body.email}).exec().then(r => {
            return r;
        })

        if (r != null) {
            console.log("Already existing: ", r)
            throw "un utilisateur est déjà enregistré sous cet email"
        }


        newUser.save()
            .then( async function (r) {
                let token = jwt.sign(
                    {id: newUser._id},
                    config.secret,
                    {expiresIn: 86400} //24h
                )

                try {
                    await utils.createProfile({
                        _id : newUser._id,
                        Username: req.body.username,
                        Phone: req.body.phone,
                        Type: req.body.type,
                        Role: req.body.role,
                        Legal: {
                            SIRET: req.body.legal.siret,
                            IBAN: req.body.legal.iban,
                        }
                    }).then(r => console.log("CreateProfile: ", r))
                } catch (e) {
                    console.log(e)
                    res.status(400).json({
                        message: e,
                    })
                    return res
                }

                res.status(200).json({
                    auth: true,
                    token: token,
                    user: newUser,
                });
            });

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
    let pwdIsValid = false

    try {
        let user = await UserModel.model.findOne({Email: req.body.email}).then(r => {
            return r;
        })

        if (user != null) {
            pwdIsValid = bcrypt.compareSync(req.body.password, user.Password);
        }
        if (!!!user || !pwdIsValid) {
            throw "Aucun utilisateur avec ce couple email/mot de passe n'a été trouvé"
        }

        let token = jwt.sign(
            {id: user._id},
            config.secret,
            {expiresIn: 86400} //24h
        );

        if(!user.populated('restaurant')){
            await user.populate('restaurant')
                .then(p=>console.log(p))
                .catch(error=>console.log(error));
        }

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
    UserModel.model.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

router.get('/:token', function (req, res) {
    UserModel.model.findOne({UserId: req.params.token}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

router.delete('/:id', function (req, res) {
    UserModel.model.remove({UserId: req.params.id}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
