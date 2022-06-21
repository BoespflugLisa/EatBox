const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const text = require('../config')
const UserModel = require("../models/User")
const router = express.Router();

function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}

// Register
router.post('/register', function (req, res) {
    let newUser = new UserModel();
    try {
        newUser.UserName = req.body.username;
        newUser.Email = req.body.email;
        newUser.Password = bcrypt.hashSync(req.body.password, 8);

        if(UserModel.findOne({Email:req.body.email})){
            throw new UserException("un utilisateur est déjà enregistré sous cette email")
        }

        let token = jwt.sign(
            {id: newUser._id},
            text.config.secret,
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

router.get('/:id', function (req, res) {
    UserModel.findOne({UserId: req.params.id}, function (err, data) {
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
