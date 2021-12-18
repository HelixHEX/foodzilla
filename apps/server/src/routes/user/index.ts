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


// router.post('/me', async (req, res) => {
//     const {body} = req;
// })

// router.post('/me', (req, res) => {

// })

// router.post('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             return console.log(err)
//         } else {
//             res.send({success: true})
//         }
//     })
// })
// router.post('/me', async (req, res) => {
//     const { body } = req;
//     const { email,}
// })



module.exports = router