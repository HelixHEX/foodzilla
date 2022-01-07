import 'dotenv-safe/config'
import "reflect-metadata"

import express from 'express';

// @ts-ignore
const cors = require('cors')

import morgan from 'morgan'
//prisma
import { PrismaClient } from '@prisma/client'
// const cron = require("cron");

const user = require('./routes/user')
const auth = require('./routes/auth')
const group = require('./routes/group')
const restaurant = require('./routes/restaurant')
const vote = require('./routes/vote')

import jwt from 'jsonwebtoken'


export const prisma = new PrismaClient()

const main = async () => {
    const app = express();

    // @ts-ignore
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    app.use(morgan(":remote-user [:date[clf]] ':method :status :url HTTP/:http-version' :body ':user-agent' - :response-time ms"));

    app.use(express.json());

    //cors 
    // app.use(cors({ origin: ['http://localhost:3000'] }))
    // app.use


    //middleware

    //validate user 
    const validateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // const { body, method } = req;
        const publicRoutes = ['/api/v1/auth/login', '/api/v1/auth/signup', '/']
        if (!publicRoutes.includes(`${req.originalUrl}`)) {
            const authHeader = req.get("Authorization") as any;
            if (!authHeader) {
                res.status(401).json({ message: 'not authenticated' });
            };
            const token = authHeader.split(' ')[1];
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, process.env.SECRET);
                if (!decodedToken) {
                    res.status(401).json({ message: 'unauthorized' });
                } else {
                    req.user = decodedToken
                    next()
                };
            } catch (err) {
                res.status(500).json({ message: err.message || 'could not decode the token' });
            };
        } else {
            next()
        }
    }

    app.use(validateUser)

    //routes 
    app.get("/", (_, res: express.Response) => {
        res.send("Hello world");
    });

    //routes
    app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/group', group)
    app.use('/api/v1/restaraunt', restaurant)
    app.use('/api/v1/vote', vote)

    app.use((_, res: express.Response) => {
        res.status(404).json({ status: "404" });
    });

    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });

}

main()