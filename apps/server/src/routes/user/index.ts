import express from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router()


router.post('/', async (req: express.Request, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.userId } })
        if (user) {
            const {password, ...other} = user
            res.json({ success: true, user:other }).status(200)
        } else {
            res.json({ success: false, message: 'User not fonud' }).status(404)
        }
    }
    catch (e) {
        console.log(e)
        res.json({ success: false, message: 'An error has occurred' }).status(400)
    }
})

module.exports = router