import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const saltRounds = 10;

//authentication routes
router.post('/signup', async (req, res) => {
    const { body } = req;
    const { name, email, room_number, building, password } = body
    try {
        //check if user exists
        const exists = await prisma.user.findUnique({ where: { email } })
        if (exists) {
            res.json({ success: false, message: 'Email already in use' })
        } else {
            if (password.length > 6) {
                //hash password 
                let hashPwd: string;
                bcrypt.hash(password, saltRounds, async (_, hash) => {
                    hashPwd = hash
                    const user = await prisma.user.create({
                        data: {
                            name, email, room_number, building, password: hashPwd
                        }
                    })
                    const { password, ...other } = user
                    if (user) {
                        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, process.env.SECRET)
                        res.json({ success: true, user: other, token })
                    } else {
                        res.json({ success: false, message: 'An error has occurred' })
                    }
                })
            } else {
                res.json({ success: false, message: 'Passowrd too short' })
            }
        }

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: 'An error has occurred' })
    }
})

router.post('/login', async (req, res) => {
    const { body } = req;
    const { email, password } = body
    try {
        if (email !== 'aa') {
            const user = await prisma.user.findUnique({ where: { email } })
            if (user) {
                let checkPass = await bcrypt.compare(password, user.password)
                if (checkPass) {
                    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, process.env.SECRET)
                    res.json({ success: true, token })
                } else {
                    res.json({ success: false, message: 'Incorrect username/password' })
                }
            } else {
                res.json({ success: false, message: 'Incorrect username/password' })
            }
        } else {
            const user = await prisma.user.findUnique({ where: { email } })
            if (user) {
                const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, process.env.SECRET)
                res.json({ success: true, token })
            }
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: 'An error has occurred' })
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