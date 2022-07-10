import express = require("express");
const router = express.Router();

import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()


router.get('/', async (req: any, res: any) => {
    try {
        const developers = await prisma.developers.findMany({
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
                    developer : r
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
        const developer = await prisma.developers.findUnique({
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
                    developer : r
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
        await prisma.developers.update({
            where: {
                id: +req.params.id,
            },
            data: req.body.data,
        }).then(() => {
            res.json({
                status: 204,
                message: 'Developer updated successfully!'
            });
        })

    }  catch (e: any) {
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
        await prisma.developers.delete({
            where: {
                id: +req.params.id
            }
        }).then(() => {
            res.json({
                status: 204,
                message: 'Developer deleted successfully!'
            });
        })

    } catch (e) {

    }
});

module.exports = router;
