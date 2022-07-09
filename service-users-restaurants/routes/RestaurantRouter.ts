import express = require("express");


const router = express.Router();

import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()


router.get('/', async (req: any, res: any) => {
    try {
        const restaurants = await prisma.restaurants.findMany()
            .then(() => {
                res.json({
                    status: 200,
                    restaurants : restaurants
                })
            })
    } catch (e) {
        console.log(e);
        res.sendStatus(400).json(e)
    } finally {
        await prisma.$disconnect()
    }
})

router.get('/:id', async (req: any, res: any) => {
    try {
        const restaurant = await prisma.restaurants.findUnique({
            where : {
                id : +req.params.id
            }
        })
            .then(() => {
                res.json({
                    status: 200,
                    restaurant : restaurant
                })
            })
    } catch (e) {

    } finally {
        await prisma.$disconnect()
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        await prisma.restaurants.update({
            where: {
                id: +req.params.id,
            },
            data: req.body.data,
        }).then(() => {
            res.json({
                status: 204,
                message: 'Restaurant updated successfully!'
            });
        })

    } catch (e) {

    }

})

router.delete('/delete/:id', async function (req, res) {
    try {
        await prisma.restaurants.delete({
            where: {
                id: +req.params.id
            }
        }).then(() => {
            res.json({
                status: 204,
                message: 'Restaurant deleted successfully!'
            });
        })

    } catch (e) {

    }
});

module.exports = router;
