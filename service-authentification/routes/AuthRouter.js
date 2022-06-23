const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')
const UserModel = require('../models/User.js')
const router = express.Router();

// Register
router.post('/register', function (req, res) {
    let newUser = new UserModel();
    try {
        newUser.Username = req.body.username;
        newUser.Email = req.body.email;
        newUser.Password = bcrypt.hashSync(req.body.password, 8);
        newUser.Phone = req.body.phone;
        newUser.Type = req.body.type;

        if(UserModel.findOne({Email:req.body.email})){
            throw Error("un utilisateur est déjà enregistré sous cet email")
        }

        let token = jwt.sign(
            {id: newUser._id},
            config.secret,
            {expiresIn:86400} //24h
        )

        newUser.save()
            .then(function (r) {
                res.status(200).json({
                    auth: true,
                    token: token,
                    user: r,
                });
            });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message,
        })
    }
});

router.post('/login', (req, res) => {
    //https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router

    UserModel.findOne({Email:req.body.email}, (err, user) => {
        if(err) return res.status(500).json({
            message : "Le serveur n'a pas répondu"
        })
        let pwdIsValid = true//bcrypt.compareSync(req.body.password, user.Password);
        if(!user || !pwdIsValid) return res.status(404).json({
            message : "Aucun utilisateur avec ce couple email/mot de passe n'a été trouvé"
        })

        let token = jwt.sign(
            {id : user._id},
            config.secret,
            {expiresIn:86400} //24h
        );
        res.status(200).json({
            auth:true,
            token: token,
            user: user,
        })
    })
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
