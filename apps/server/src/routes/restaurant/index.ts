import express from 'express'
import axios from "axios";

import { PrismaClient } from '@prisma/client'
import { categorySets } from '../../utils/categorySets';
const prisma = new PrismaClient()

const router = express.Router()

router.post('/search/:query', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { categorySet, query, lon, lat, radius, offset, limit } = body;
    try {
        if (categorySet) {
            await axios.get(`${process.env.TOMTOMURL}/poiSearch/${query}.json?key=${process.env.TOMTOMAPIKEY}&categorySet=${categorySet}&lon=${lon}&lat=${lat}&radius=${radius}&ofs=${offset}&limit=${limit}`).then((response: any) => {
                if (response.data.summary) {
                    console.log(response.data.summary)
                    const remaining = response.data.summary.totalResults <= 1900 ? response.data.summary.totalResults - (offset + 20) < 0 ? 0 : response.data.summary.totalResults - (offset + 20) : offset < 1900 ? 1900 - (offset + 20) : 0

                    res.json({ success: true, results: response.data.results, remaining }).status(200)
                } else {
                    res.json({ success: false, message: 'An error has occurred' }).status(400)
                }
            })
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/search/trending/:category', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { categorySet, lon, lat, radius, limit, offset } = body
    try {
        if (categorySet) {
            await axios.get(`${process.env.TOMTOMURL}/poiSearch/.json?key=${process.env.TOMTOMAPIKEY}&categorySet=${categorySet}&lon=${lon}&lat=${lat}&radius=${radius}&limit=${limit}&ofs=${offset}`).then((response: any) => {
                if (response.data.summary) {
                    console.log(response.data.summary)
                    const remaining = response.data.summary.totalResults <= 1900 ? response.data.summary.totalResults - (offset + 20) : offset < 1900 ? 1900 - (offset + 20) : 0

                    res.json({ success: true, results: response.data.results, remaining }).status(200)
                } else {
                    console.log(response.data.errorText)
                    res.json({ success: false, message: 'An error has occurred' }).status(400)
                }
            })
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/save-to-group', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { groupId, restarauntInfo } = body
    console.log(restarauntInfo)
    try {
        // const group = await 
        const group = await prisma.group.findUnique({ where: { id: groupId }, include: { restaurants: true, users: true } })
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                if (!group.restaurants.find(restaurant => restaurant.tomtom_id == restarauntInfo.id)) {
                    const restaurant = await prisma.restaurant.findFirst({ where: { tomtom_id: restarauntInfo.id } })
                    if (restaurant) {
                        await prisma.group.update({ where: { id: groupId }, data: { restaurants: { connect: { id: restaurant.id } } } })
                    } else {
                        await prisma.restaurant.create({
                            data: {
                                tomtom_id: restarauntInfo.id,
                                name: restarauntInfo.name,
                                type: categorySets.find((category: any) => category.categorySet === restarauntInfo.categorySet)!.name,
                                lon: restarauntInfo.lon,
                                lat: restarauntInfo.lat,
                                address: restarauntInfo.address,
                                categorySet: restarauntInfo.categorySet,
                                url: restarauntInfo.url,
                                phone: restarauntInfo.phone,
                                groups: { connect: { id: groupId } }
                            }
                        })
                    }
                    res.json({ success: true }).status(200)
                } else {
                    res.json({ success: false, message: 'Restaraunt already saved' }).status(400)
                }
            } else {
                res.json({ success: false, message: 'Not a member of group' }).status(403)
            }
        } else {
            res.json({ success: false, message: 'Group not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/unsave-from-group', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { groupId, restarauntId } = body;
    try {
        const group = await prisma.group.findUnique({ where: { id: groupId }, include: { users: true, restaurants: true } })
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                const restaurant = await prisma.restaurant.findUnique({ where: { id: restarauntId } })
                if (restaurant) {
                    console.log(group.restaurants)
                    if (group.restaurants.find(oldRestaurant => oldRestaurant.id == restaurant.id)) {
                        await prisma.group.update({ where: { id: groupId }, data: { restaurants: { disconnect: { id: restaurant.id } } } })
                        res.json({ success: true }).status(200)
                    } else {
                        res.json({ success: false, message: 'Restaraunt already removed' }).status(404)
                    }
                } else {
                    res.json({ success: false, message: 'Restaraunt not found' }).status(404)
                }
            } else {
                console.log(group.users)
                console.log(req.user.userId)
                res.json({ success: false, message: 'Not a member of group' }).status(403)
            }
        } else {
            res.json({ success: false, message: 'Group not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/save-to-account', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { restarauntInfo } = body
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.userId }, include: { saved_restaraunts: true } })
        if (user) {
            if (!user.saved_restaraunts.find(restaurant => restaurant.tomtom_id == restarauntInfo.id)) {
                const restaurant = await prisma.restaurant.findFirst({ where: { tomtom_id: restarauntInfo.id } })
                if (restaurant) {
                    await prisma.user.update({ where: { id: req.user.userId }, data: { saved_restaraunts: { connect: { id: restaurant.id } } } })
                } else {
                    await prisma.restaurant.create({
                        data: {
                            tomtom_id: restarauntInfo.id,
                            name: restarauntInfo.name,
                            type: categorySets.find((category: any) => category.categorySet === restarauntInfo.categorySet)!.name,
                            lon: restarauntInfo.lon,
                            lat: restarauntInfo.lat,
                            address: restarauntInfo.address,
                            categorySet: restarauntInfo.categorySet,
                            url: restarauntInfo.url,
                            phone: restarauntInfo.phone,
                            users: { connect: { id: req.user.userId } }
                        }
                    })
                }
                res.json({ success: true }).status(200)
            } else res.json({ success: false, message: "Restaraunt already saved" }).status(400)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})


module.exports = router