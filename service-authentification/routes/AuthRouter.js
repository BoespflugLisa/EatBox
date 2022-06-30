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
    console.log(req.body)

    let newUser = new UserModel.model({
        Username: req.body.username,
        Email: req.body.email,
        Password: bcrypt.hashSync(req.body.password, 8),
        restaurant: null,
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
            .then(async function (r) {
                let token = jwt.sign(
                    {id: newUser._id},
                    config.secret,
                    {expiresIn: 86400} //24h
                )

                try {
                    await utils.createProfile({
                        _id: newUser._id,
                        ProfileImg: req.body.ProfileImg,
                        CoverImg: req.body.CoverImg,
                        Username: req.body.username,
                        Phone: req.body.phone,
                        Type: req.body.type,
                        Role: req.body.role,
                        Legal: {
                            SIRET: req.body.legal.siret,
                            IBAN: req.body.legal.iban,
                        }
                    }).then(r => console.log("CreateProfile: ", r))
                        .catch(err => {
                            throw err

                        })
                } catch (e) {
                    console.log(e)
                    res.status(400).json({
                        message: e,
                    })
                    return res
                }

                console.log(newUser)

                res.status(200).json({
                    auth: true,
                    token: token,
                    user: {
                        _id: newUser._id,
                        Role: req.body.role,
                    },

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
        let user = await UserModel.model.findOne({Email: req.body.email, Role: {$ne: "Restaurant"}}).then(r => {
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

        if (req.body.Role === "Livreur" && !!user.livreur) {
            await user.populate('livreur')
                .then(p => console.log(p))
                .catch(error => console.log(error));
            user = {
                _id: user._id,
                Role: req.body.Role,
                user_id: user.livreur._id,
            }
        }

        if (req.body.Role === "Client" && !!user.client) {
            await user.populate('client')
                .then(p => console.log(p))
                .catch(error => console.log(error));
            user = {
                _id: user._id,
                Role: req.body.Role,
                user_id: user.client._id,
            }
        }

        res.status(200).json({
            auth: true,
            token: token,
            user
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err,
        })
        return res
    }
});

router.post('/loginRestaurant', async (req, res) => {
    //https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router
    let pwdIsValid = false
    console.log(req.body)


    try {
        let user = await UserModel.model.findOne({Email: req.body.email, Role: {$eq: req.body.Role}}).then(r => {
            return r;
        })
        console.log()

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

        if (!user.populated('restaurant')) {
            await user.populate('restaurant')
                .then(p => console.log(p))
                .catch(error => console.log(error));
        }
        //console.log(user)


        user = {
            _id: user._id,
            Role: req.body.Role,
            user_id: user.restaurant._id,
        }


        res.status(200).json({
            auth: true,
            token: token,
            user
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
    try {
        UserModel.model.findByIdAndDelete(req.params.id).then(() => {
            res.status(204).json({
                message: 'User deleted successfully!'
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
