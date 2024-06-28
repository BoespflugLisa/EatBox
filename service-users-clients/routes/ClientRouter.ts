import express = require("express");

const router = express.Router();

import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()


router.get('/', async (req: any, res: any) => {
    try {
        const clients = await prisma.clients.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                }
            }
        })
            .then(r => {
                res.json({
                    status: 200,
                    clients: r
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

router.get('/:id', async (req: any, res: any) => {
    try {
        const client = await prisma.clients.findUnique({
            where: {
                id: +req.params.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                }
            }
        })
            .then(r => {
                res.json({
                    status: 200,
                    client: r
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
        await prisma.clients.update({
            where: {
                id: +req.params.id,
            },
            data: req.body.data,
        }).then(() => {
            res.json({
                status: 204,
                message: 'Client updated successfully!'
            });
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

router.delete('/delete/:id', async function (req, res) {
    try {
        await prisma.clients.findUnique({
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
                        message: 'Client deleted successfully!'
                    });
                })
            }
        })

    } catch (e) {
        console.log(e)
        res.json({
            status: 404,
            message: e
        });
    }
});

module.exports = router;
