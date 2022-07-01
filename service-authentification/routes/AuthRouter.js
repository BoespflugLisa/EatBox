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

        let newUser;
        if (req.body.role === 'Restaurant') {
            newUser = new UserModel.model({
                Email: req.body.email,
                Password: bcrypt.hashSync(req.body.password, 8),
                Role: req.body.role,
                restaurant: null,
                suspended: false,
            });
        } else if (req.body.role === 'Developpeur') {
            newUser = new UserModel.model({
                Email: req.body.email,
                Password: bcrypt.hashSync(req.body.password, 8),
                Role: req.body.role,
                developer: null,
                suspended: false,
            });
        } else {
            newUser = new UserModel.model({
                Email: req.body.email,
                Password: bcrypt.hashSync(req.body.password, 8),
                Role: req.body.role,
                livreur: null,
                client: null,
                suspended: false,
            });
        }

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

                    let userInfos;

                    switch (req.body.role) {
                        case 'Restaurant':
                            userInfos = {
                                _id: newUser._id,
                                CoverImg: req.body.CoverImg,
                                Name: req.body.name,
                                Phone: req.body.phone,
                                Type: req.body.type,
                                Role: req.body.role,
                                Legal: {
                                    SIRET: req.body.legal.siret,
                                    IBAN: req.body.legal.iban,
                                },
                                Address: {
                                    Number: req.body.address.number,
                                    Street: req.body.address.street,
                                    Town: req.body.address.town,
                                    Code: req.body.address.code,
                                }
                            };
                            break;

                        case 'Client' :
                            userInfos = {
                                _id: newUser._id,
                                Name: req.body.name,
                                Lastname: req.body.lastname,
                                Phone: req.body.phone,
                                Role: req.body.role,
                                Address: {
                                    Number: req.body.address.number,
                                    Street: req.body.address.street,
                                    Town: req.body.address.town,
                                    Code: req.body.address.code,
                                }
                            };
                            break;

                        case 'Livreur' :
                            userInfos = {
                                _id: newUser._id,
                                Name: req.body.name,
                                Lastname: req.body.lastname,
                                ProfileImg: req.body.ProfileImg,
                                Phone: req.body.phone,
                                Role: req.body.role,
                                IBAN: req.body.iban,
                            }

                        case 'Developpeur':
                            userInfos = {
                                _id: newUser._id,
                                Firstname: req.body.name,
                                Lastname: req.body.lastname,
                                Role: req.body.role,
                            }
                    }

                    try {
                        await utils.createProfile(userInfos)
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

    }
)
;

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
                .then()
                .catch(error => console.log(error));
            user = {
                _id: user._id,
                Role: req.body.Role,
                user_id: user.livreur._id,
            }
        }

        if (req.body.Role === "Client" && !!user.client) {
            await user.populate('client')
                .then()
                .catch(error => console.log(error));
            user = {
                _id: user._id,
                Role: req.body.Role,
                user_id: user.client._id,
            }
        }

        if (req.body.Role === "Developpeur" && !!user.developpeur) {
            await user.populate('developpeur')
                .then()
                .catch(error => console.log(error));
            user = {
                _id: user._id,
                Role: req.body.Role,
                user_id: user.developpeur._id,
            }
        }

        try {
            await utils.createLogConnection(user._id);
        }
        catch (err) {
                throw err;
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

    try {
        let user = await UserModel.model.findOne({Email: req.body.email, Role: {$eq: req.body.Role}}).then(r => {
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

        if (!user.populated('restaurant')) {
            await user.populate('restaurant')
                .then()
                .catch(error => console.log(error));
        }

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
            console.log(data)
            res.json(data);
        }
    }).populate('restaurant', 'Name Type Address Legal Phone').populate('livreur', 'Lastname Firstname AccountName IBAN Phone').populate('client', 'Firstname Name Phone Address').populate('developpeur', 'Firstname LastName');
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

router.put('/suspend/:id', function (req, res) {
    UserModel.model.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(req.params.id)}, {suspended: (req.body.suspended === "True")}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
            res.status(200).json(data);
        }
    });
});


module.exports = router;
