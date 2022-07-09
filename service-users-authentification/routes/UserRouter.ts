import express from "express";
import * as dotenv from 'dotenv';

dotenv.config({path : "../.env"})

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

import {PrismaClient, Prisma} from "@prisma/client"

const prisma = new PrismaClient()


router.post('/register/developer', async (req: any, res: any) => {
    try {
        let newProfile;

        const result = await prisma.users.create({
            data: {
                "email": req.body.email,
                "Password": bcrypt.hashSync(req.body.password, 8),
                "fk_role": 6
            }
        }).then(async function (r) {
            newProfile = await prisma.developers.create({
                data: {
                    Lastname: req.body.Lastname,
                    Firstname: req.body.Firstname,
                    fk_user: r.id,
                }
            })
        })

        res.send(200).json({result, newProfile})

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.send(400).json(e)
    }
})


router.post('/register/restaurant', async (req: any, res: any) => {
    try {
        let newProfile;

        const result = await prisma.users.create({
            data: {
                "email": req.body.email,
                "Password": bcrypt.hashSync(req.body.password, 8),
                "fk_role": 3
            }
        }).then(async function (r) {
            newProfile = await prisma.restaurants.create({
                data: {
                    fk_user: r.id,
                    CoverImg: req.body.CoverImg,
                    Name: req.body.name,
                    Phone: req.body.phone,
                    Type: req.body.type,
                    Legal: {
                        AccountName: "",
                        SIRET: req.body.legal.siret,
                        IBAN: req.body.legal.iban,
                    },
                    Address: {
                        Number: req.body.address.number,
                        Street: req.body.address.street,
                        Town: req.body.address.town,
                        Code: req.body.address.code,
                    },
                    hours: {
                        monday: {
                            isOpen: true,
                            isSecondTimeRange: true,
                            startHour: "",
                            endHour: "",
                            startHour2: "",
                            endHour2: "",
                        },
                        tuesday: {
                            isOpen: true,
                            isSecondTimeRange: true,
                            startHour: "",
                            endHour: "",
                            startHour2: "",
                            endHour2: "",
                        },
                        wednesday: {
                            isOpen: true,
                            isSecondTimeRange: true,
                            startHour: "",
                            endHour: "",
                            startHour2: "",
                            endHour2: "",
                        },
                        thursday: {
                            isOpen: true,
                            isSecondTimeRange: true,
                            startHour: "",
                            endHour: "",
                            startHour2: "",
                            endHour2: "",
                        },
                        friday: {
                            isOpen: true,
                            isSecondTimeRange: true,
                            startHour: "",
                            endHour: "",
                            startHour2: "",
                            endHour2: "",
                        },
                        saturday: {
                            isOpen: true,
                            isSecondTimeRange: true,
                            startHour: "",
                            endHour: "",
                            startHour2: "",
                            endHour2: "",
                        },
                        sunday: {
                            isOpen: true,
                            isSecondTimeRange: true,
                            startHour: "",
                            endHour: "",
                            startHour2: "",
                            endHour2: "",
                        },
                    },
                    Preferences: {
                        NotificationCommand: true,
                        NotificationDeliveryman: true,
                        NotificationActivities: true,
                    },
                }
            })
        })

        res.send(200).json({result, newProfile})

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.send(400).json(e)
    }
})


router.post('/register/client', async (req: any, res: any) => {
    try {
        let newProfile;

        const result = await prisma.users.create({
            data: {
                "email": req.body.email,
                "Password": bcrypt.hashSync(req.body.password, 8),
                "fk_role": 5
            }
        }).then(async function (r) {
            newProfile = await prisma.clients.create({
                data: {
                    Lastname: req.body.lastname,
                    Firstname: req.body.name,
                    Phone: req.body.phone,
                    fk_user: r.id,
                    Address: {
                        Number: req.body.Address.Number,
                        Street: req.body.Address.Street,
                        Town: req.body.Address.Town,
                        Code: req.body.Address.Code
                    },
                }
            })
        })

        res.send(200).json({result, newProfile})

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.send(400).json(e)
    }
})

router.post('/register/delivery', async (req: any, res: any) => {
    try {
        let newProfile;

        const result = await prisma.users.create({
            data: {
                "email": req.body.email,
                "Password": bcrypt.hashSync(req.body.password, 8),
                "fk_role": 4
            }
        }).then(async function (r) {
            newProfile = await prisma.livreurs.create({
                data: {
                    Lastname: req.body.Lastname,
                    Firstname: req.body.Firstname,
                    Phone: req.body.Phone,
                    fk_user: r.id,
                    ProfileImg: req.body.ProfileImg,
                    Open_to_work: false,
                    Free: true,
                    AccountName: "",
                    IBAN: req.body.IBAN,
                }
            })
        })

        res.send(200).json({result, newProfile})

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.send(400).json(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        let token;
        let user = await prisma.users.findUnique({
            where: {
                email: req.body.email
            },
            include: {
                role: true
            }
        }).then(user => {
            if (!user) {
                throw "Vos identifiants ne sont pas corrects"
            }


            let pwdIsValid = bcrypt.compareSync(
                req.body.password,
                user.Password
            );

            if (!pwdIsValid || user.role.title !== req.body.role) {
                throw "Vos identifiants ne sont pas corrects"
            }

            token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: 86400})
            res.status(200).send({
                auth: true,
                token: token,
                user
            })

        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err,
        })
        return res
    }
});


module.exports = router;
