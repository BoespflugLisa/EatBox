import express = require("express");
const router = express.Router();

import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()


router.get('/', async (req: any, res: any) => {
    try {
        const deliverymen = await prisma.livreurs.findMany({
            include: {
                user: {
                    select: {
                        id:true,
                        email: true,
                    }
                }
            }
        })
            .then(r => {
                res.json({
                    status: 200,
                    livreurs : r
                })
            })
    } catch (e : any) {
        res.json({
            status: 200,
            message: e.message
        })
    } finally {
        await prisma.$disconnect()
    }
})

router.get('/:id', async (req: any, res: any) => {
    try {
        const livreur = await prisma.livreurs.findUnique({
            where : {
                id : +req.params.id
            },
            include: {
                user: {
                    select: {
                        id:true,
                        email: true,
                    }
                }
            }
        })
            .then(r => {
                res.json({
                    status: 200,
                    livreur : r
                })
            })
    } catch (e: any) {
        res.json({
            status: 200,
            message: e.message
        })
    } finally {
        await prisma.$disconnect()
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        console.log(req.body.data)
        await prisma.livreurs.update({
            where: {
                id: +req.params.id,
            },
            data: req.body.data,
        }).then(() => {
            res.json({
                status: 204,
                message: 'Deliveryman updated successfully!'
            });
        })

    }  catch (e: any) {
        // console.log(e)
        res.json({
            status: 200,
            message: e.message
        })
    } finally {
        await prisma.$disconnect()
    }
})

router.delete('/delete/:id', async function (req, res) {
    try {
        await prisma.livreurs.findUnique({
            where: {
                id: +req.params.id
            }
        }).then(async (r) => {
            if (!!r) {
                await prisma.users.delete({
                    where: {
                        id: r.fk_user
                    }
                }).then(() => {
                    res.json({
                        status: 204,
                        message: 'Deliveryman deleted successfully!'
                    });
                })
            }
        })

    } catch (e) {

    }
});

module.exports = router;
