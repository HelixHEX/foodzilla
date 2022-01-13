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
                if (user) {
                    users.push(user)
                } else emailError = true
            }
        }
        if (!emailError) {
            users.push(req.user)
            console.log(req.user.userId)
            let group = await prisma.group.create({
                data: {
                    name,
                    creatorId: req.user.userId,
                    users: { connect: { id: req.user.userId } }
                }
            })
            res.json({ success: true, group }).status(200)
        } else res.json({ success: false, message: "One or more emails could not be found" }).status(400)

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/all-groups-admin', async (_, res) => {
    const groups = await prisma.group.findMany({ include: { users: { select: { id: true, name: true } } } })
    res.json({ groups })
})

// router.post('/')

router.post('/active-groups', async (req: express.Request, res: express.Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.userId }, include: { groups: { where: { active: true }, include: { users: { select: { id: true, name: true } } } } } })
        // const groups = await prisma.group.findMany({where: {active: true, users: {some: {id: req.user.userId}}}})
        res.json({ success: true, groups: user!.groups }).status(200)
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

router.post('/leave-group', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { groupId } = body
    try {
        const group = await prisma.group.findUnique({ where: { id: groupId }, include: { users: true, voteSessions: true } })
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                await prisma.group.update({ where: { id: groupId }, data: { users: { disconnect: { id: req.user.userId } } } })
                // await prisma.vote_Session.updateMany({where: {id: 'fjdksl'}, data: {users: {disconnect: {id: req.user.userId}}}})
                let ids = group.voteSessions.map(session => {return {id: session.id}})
                await prisma.user.update({where: {id: req.user.userId}, data: {voteSessions: {disconnect: ids}}})
                res.json({ success: true }).status(200)
            } else {
                console.log('hi')
                res.json({ success: false, message: 'Already left' }).status(400)
            }
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/delete-group', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { groupId } = body
    try {
        const group = await prisma.group.findUnique({ where: { id: groupId } })
        if (group) {
            if (group.creatorId === req.user.userId) {
                await prisma.group.delete({ where: { id: groupId } })
                res.json({ success: true }).status(200)
            } else {
                res.json({ success: false, message: 'Only the creator can delete a group' }).status(403)
            }
        } else res.json({ success: false, message: "Group not found" }).status(404)
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    let { id: groupId } = body
    try {
        const group = await prisma.group.findUnique({ where: { id: groupId }, include: { restaurants: true, users: { select: { id: true, name: true } }, voteSessions: { include: { users: { select: { id: true, name: true } } } } } })
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                res.json({ success: true, group }).status(200)
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

router.post('/saved-restaurants', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { groupId } = body
    try {
        const group = await prisma.group.findUnique({ where: { id: groupId }, include: { users: true, restaurants: true } })
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                res.json({ success: true, restaurants: group.restaurants }).status(200)
            } else {
                res.json({ success: false, message: "Not a member of group" }).status(403)
            }
        } else {
            res.json({ success: false, message: 'Group not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/add-member', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { groupId, email } = body;
    try {
        const group = await prisma.group.findUnique({ where: { id: groupId }, include: { users: true, voteSessions: true } })
        if (group) {
            if (group.creatorId === req.user.userId) {
                if (!group.users.find(user => user.email === email)) {
                    const user = await prisma.user.findFirst({ where: { email } })
                    if (user) {
                        await prisma.group.update({ where: { id: groupId }, data: { users: { connect: { id: user.id } } } })
                        const ids = group.voteSessions.map(session => {return {id: session.id}})
                        await prisma.user.update({where: {id: user.id}, data: {voteSessions: {connect: ids}}})
                        res.json({ success: true }).status(200)
                    } else {
                        res.json({ success: false, message: 'User not found' }).status(404)
                    }
                } else {
                    res.json({ success: false, message: 'User already a member' }).status(400)
                }
            } else {
                res.json({ success: false, message: 'Only the creator can create a group' }).status(304)
            }
        } else {
            res.json({ success: false, message: 'Group not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

module.exports = router