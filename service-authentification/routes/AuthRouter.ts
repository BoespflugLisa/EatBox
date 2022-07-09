import express from "express";
import * as dotenv from 'dotenv';

dotenv.config({path: "../.env"})

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

        res.sendStatus(200).json({result, newProfile})
        return;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.sendStatus(400).json(e)
    } finally {
        await prisma.$disconnect()
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

        res.sendStatus(200).json({result, newProfile})

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.sendStatus(400).json(e)
    } finally {
        await prisma.$disconnect()
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

        res.sendStatus(200).json({result, newProfile})

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.sendStatus(400).json(e)
    } finally {
        await prisma.$disconnect()
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

        res.json({
            status: 200,
            result,
            newProfile
        })

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        res.sendStatus(400).json(e)
    } finally {
        await prisma.$disconnect()
    }
})

router.post('/login', async (req, res) => {
    try {
        let token;
        await prisma.users.findUnique({
            where: {
                email: req.body.email
            },
            include: {
                role: true
            }
        }).then(async user => {
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

            let user_token = await prisma.token.findUnique({
                where: {
                    userId: user.id,
                }
            })

            //Création du token dans la BDD
            if (!user_token) {
                await prisma.token.create({
                    data: {
                        value: token,
                        userId: user.id,
                    }
                })
            } else {
                await prisma.token.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        value: token
                    }
                })
            }

            let profileid = null
            switch (+user.role.id) {
                case 3:
                    profileid = await prisma.restaurants.findFirst({
                        where: {fk_user: user.id},
                        select: {id: true}
                    }).then(r => {
                        if(!!r){
                            return r.id
                        }
                    })
                break;

                case 4:
                    profileid = await prisma.livreurs.findFirst({
                        where: {fk_user: user.id},
                        select: {id: true}
                    }).then(r => {
                        if(!!r){
                            return r.id
                        }
                    })
                break;

                case 5:
                    profileid = await prisma.clients.findFirst({
                        where: {fk_user: user.id},
                        select: {id: true}
                    }).then(r => {
                        if(!!r){
                            return r.id
                        }
                    })
                break;

                case 6:
                    profileid = await prisma.developers.findFirst({
                        where: {fk_user: user.id},
                        select: {id: true}
                    }).then(r => {
                        if(!!r){
                            return r.id
                        }
                    })
                break;
            }

            res.status(200).json({
                auth: true,
                token: token,
                user,
                profileid
            })
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err,
        })
        return res
    } finally {
        await prisma.$disconnect()
    }
});

router.post('/logout', async (req, res) => {
    try {
        await prisma.token.update({
            where: {
                userId: +req.body.id
            },
            data: {
                value: null,
            }
        })

        res.json({
            status: 200,
            message: "Déconnexion réussie"
        })
    } catch (err) {
        console.log(err)
        res.json({
            status: 400,
            message: err,
        })
    } finally {
        await prisma.$disconnect()
    }
});


module.exports = router;
