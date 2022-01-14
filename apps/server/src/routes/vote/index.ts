import express from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router()

router.post('/new-voting-session', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { groupId, options } = body;
    try {
        const group = await prisma.group.findUnique({ where: { id: groupId }, include: { users: { select: { id: true, name: true } } } })
        if (group) {
            let exists = group.users.find(user => user.id === req.user.userId)
            if (exists) {
                await prisma.vote_Session.create({
                    data: {
                        createdBy: req.user.userId,
                        group: { connect: { id: group.id } },
                        restaurants: options,
                        users: { connect: { id: req.user.userId } }
                    }
                })
                res.json({ success: true }).status(200)
            } else {
                res.json({ success: false, message: 'Invalid access' }).status(403)
            }
        } else {
            res.json({ success: false, message: 'Group not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/all-voting-sessions', async (req: express.Request, res: express.Response) => {
    // const { body } = req;
    // const { groupId } = body
    try {
        // const sessions = await prisma.user.findUnique({ where: { id: req.user.userId }, include: { voteSessions: { include: { group: true, users: { select: { id: true, email: true, name: true } } } } } })
        console.log(req.user.userId)
        const sessions = await prisma.vote_Session.findMany({ where: { OR: [{ended: true}, {createdBy: req.user.userId}], AND: { group: { users: { some: { id: req.user.userId } } } } }, include: { users: { select: { id: true, email: true, name: true } }, group: true } })
        // const sessions = await prisma.vote_Session.findMany({ where: { group: { users: { some: { id: req.user.userId } } } }, include: { users: { select: { id: true, email: true, name: true } }, group: true } })
        // const group = await prisma.group.findUnique({ where: { id: groupId }, include: { voteSessions: { include: { users: { select: { id: true, name: true } } } } } })
        if (sessions) {
            console.log(sessions)
            // sessions.map(session => {
            //     console.log(`users: ${session.users.map}\nended: ${session.ended}`)
            // })
            // console.log(sessions.forEach())
            res.json({ success: true, sessions }).status(200)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/end-voting-session', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { sessionId } = body
    try {
        const session = await prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { votes: true } })
        if (session) {
            if (!session.ended) {
                if (session.createdBy === req.user.userId) {
                    let votes = [{ restaraunt_name: 'Wendys', votes: 1 }, { restaraunt_name: 'Chic-fil-a', votes: 4 }, { restaraunt_name: 'Jack in the box', votes: 2 }] as any
                    session.votes.forEach(vote1 => {
                        let index = votes.findIndex((vote: any) => vote.restaraunt_name === vote1.restaraunt_name)
                        if (index >= 0) {
                            votes[index].votes += 1;
                        } else {
                            votes.push({
                                restaraunt_name: vote1.restaraunt_name,
                                votes: 1
                            })
                        }
                    })
                    votes = votes.sort((a: any, b: any) => b.votes - a.votes)
                    await prisma.vote_Session.update({ where: { id: sessionId }, data: { ended: true } })
                    res.json({ success: true, votes }).status(200)
                } else {
                    res.json({ success: false, message: 'Only the creator can end a session' }).status(403)
                }
            } else {
                res.json({ success: false, message: 'Vote session already ended' }).status(400)
            }
        } else {
            res.json({ success: false, message: 'Vote session not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})


router.post('/open-voting-session', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { sessionId } = body
    try {
        const session = await prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { votes: true } })
        if (session) {
            if (session.ended) {
                if (session.createdBy === req.user.userId) {
                    // let votes = [{ restaraunt_name: 'Wendys', votes: 1 }, { restaraunt_name: 'Chic-fil-a', votes: 4 }, { restaraunt_name: 'Jack in the box', votes: 2 }] as any
                    // session.votes.forEach(vote1 => {
                    //     let index = votes.findIndex((vote: any) => vote.restaraunt_name === vote1.restaraunt_name)
                    //     if (index >= 0) {
                    //         votes[index].votes += 1;
                    //     } else {
                    //         votes.push({
                    //             restaraunt_name: vote1.restaraunt_name,
                    //             votes: 1
                    //         })
                    //     }s
                    // })
                    // votes = votes.sort((a: any, b: any) => b.votes - a.votes)
                    await prisma.vote_Session.update({ where: { id: sessionId }, data: { ended: false } })
                    res.json({ success: true }).status(200)
                } else {
                    res.json({ success: false, message: 'Only the creator can end a session' }).status(403)
                }
            } else {
                res.json({ success: false, message: 'Vote session already opened' }).status(400)
            }
        } else {
            res.json({ success: false, message: 'Vote session not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})



router.post('/join-voting-session', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { sessionId } = body;
    try {
        const voteSession = await prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { group: { include: { users: { select: { id: true, name: true } } } }, users: { select: { id: true, name: true } } } })
        if (voteSession) {
            if (voteSession.group.users.find(user => user.id === req.user.userId)) {
                if (!voteSession.users.find(user => user.id === req.user.userId)) {
                    await prisma.vote_Session.update({ where: { id: sessionId }, data: { users: { connect: { id: req.user.userId } } } })
                    res.json({ success: true }).status(200)
                } else {
                    res.json({ success: false, message: 'Already a member of the group' }).status(400)
                }
            } else {
                res.json({ success: false, message: 'Not a member of the group' }).status(404)
            }
        } else {
            res.json({ success: false, message: 'Vote session not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/place-vote', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { sessionId, vote } = body;
    try {
        const session = await prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { users: { select: { id: true, name: true } }, votes: { select: { id: true, user: { select: { id: true, name: true } } } } } })
        if (session) {
            if (!session.ended) {
                if (session.users.find(user => user.id === req.user.userId)) {
                    let findVote = session.votes.find(voter => voter.user.id === req.user.userId)
                    // console.log(findVote.u)
                    if (!findVote) {
                        if (session.restaurants.find(option => option === vote)) {
                            await prisma.vote.create({
                                data: {
                                    user: { connect: { id: req.user.userId } },
                                    restaraunt_name: vote,
                                    VoteSession: { connect: { id: session.id } }
                                }
                            })
                            res.json({ success: true }).status(200)
                        } else {
                            res.json({ success: false, message: 'Restaraunt not found' }).status(404)
                        }
                    } else {
                        await prisma.vote.update({ where: { id: findVote.id }, data: { restaraunt_name: vote } })
                        res.json({ success: true }).status(200)
                    }
                } else {
                    res.json({ success: false, message: 'You have not joined the session' }).status(403)
                }
            } else {
                res.json({ success: false, message: 'Voting session has ended' }).status(400)
            }
        } else {
            res.json({ success: false, message: 'Vote session not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/all-votes', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { sessionId } = body
    try {
        const session = await prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { votes: { include: { user: { select: { id: true, name: true } } } }, users: { select: { id: true, name: true } } } })
        if (session) {
            if (session.users.find(user => user.id === req.user.userId)) {
                if (!session.anonymous) {
                    res.json({ success: true, votes: session.votes }).status(200)
                } else {
                    res.json({ success: false, message: 'Anonymous voting session' }).status(403)
                }
            } else {
                res.json({ success: false, message: 'You have not joined the session' }).status(403)
            }
        } else {
            res.json({ success: false, message: 'Vote session not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/delete', async () => {
    await prisma.vote.deleteMany()
})

router.post('/add-option', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { sessionId, vote } = body
    try {
        const session = await prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { users: true } })
        if (session) {
            if (session.users.find(user => user.id === req.user.userId)) {
                if (session.add_options || session.createdBy === req.user.userId) {
                    if (!session.restaurants.find(restaurant => restaurant === vote)) {
                        await prisma.vote_Session.update({ where: { id: sessionId }, data: { restaurants: [...session.restaurants, vote] } })
                        res.json({ success: true }).status(200)
                    } else {
                        res.json({ success: false, message: 'Option already added' }).status(400)
                    }
                } else {
                    res.json({ success: false, message: 'New options can\'t be added' }).status(403)
                }
            } else {
                res.json({ success: false, message: 'You have not joined this session' }).status(404)
            }
        } else {
            res.json({ success: false, message: 'Vote session not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/session/:id', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { id } = body
    try {
        const session = await prisma.vote_Session.findUnique({ where: { id }, include: { users: { select: { id: true, name: true } }, votes: { include: { user: { select: { id: true, name: true } } } } } })
        if (session) {
            if (session.users.find(user => user.id === req.user.userId) || session.ended) {
                res.json({ success: true, session }).status(200)
            } else res.json({ success: false, message: 'Invalid access' }).status(403)
        } else res.json({ success: false, message: 'Vote session not found' }).status(404)
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

router.post('/leave-session', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { sessionId } = body
    try {
        const session = await prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { users: true } })
        if (session) {
            if (session.users.find(user => user.id === req.user.userId)) {
                await prisma.vote_Session.update({ where: { id: sessionId }, data: { users: { disconnect: { id: req.user.userId } } } })
                res.json({ success: true }).status(200)
            } else {
                res.json({ success: false, message: 'Have not joined session' }).status(400)
            }
        } else {
            res.json({ success: false, message: 'Vote session not found' }).status(404)
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})
module.exports = router
