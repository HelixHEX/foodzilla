import express from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router()

router.post('/create-group', async (req: express.Request, res: express.Response) => {
    const { body } = req
    const { emails, name } = body
    try {
        let users = [] as any
        let emailError = false
        for (var email of emails) {
            if (email !== req.user.email) {
                const user = await prisma.user.findUnique({ where: { email } })
                users.push(user)
            } else emailError = true
        }
        if (!emailError) {
            users.push(req.user)
            let group = await prisma.group.create({
                data: {
                    name,
                    creatorId: req.user.userId,
                    users: {connect: users.map((user:any) => {return {id: user.id ? user.id : user.userId}} )}
                }
            })
            res.json({success: true, group}).status(200)
        }
        else res.json({ success: false, message: "One or more emails could not be found" }).status(400)

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/all-groups', async(_,res) => {
    const groups = await prisma.group.findMany({include: {users: true}})
    res.json({groups})
})

router.post('/active-groups', async (req:express.Request, res:express.Response) => {
    try {
        const groups = await prisma.group.findMany({where: {active: true, users: {some: {id: req.user.userId}}}})
        res.json({success: true, groups}).status(200)
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/check-user-exists', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { email } = body
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            res.json({ success: true }).status(200)
        } else {
            res.json({ success: false, message: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})


router.post('/past-groups', async (req: express.Request, res: express.Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.userId } })
        if (user) {
            const groups = await prisma.group.findMany({
                where: {
                    active: false,
                    users: {
                        some: {
                            id: user.id
                        }
                    }
                },
            })
            res.json({ sucess: true, groups }).status(200)
        } else {
            res.json({ success: false, message: 'User not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})


module.exports = router