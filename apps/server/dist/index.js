"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv-safe/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const user = require('./routes/user');
const auth = require('./routes/auth');
const group = require('./routes/group');
const restaurant = require('./routes/restaurant');
const vote = require('./routes/vote');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const cron = require("cron");
exports.prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    morgan_1.default.token('body', (req, res) => JSON.stringify(req.body));
    app.use((0, morgan_1.default)(":remote-user [:date[clf]] ':method :status :url HTTP/:http-version' :body ':user-agent' - :response-time ms"));
    app.use(express_1.default.json());
    const validateUser = (req, res, next) => {
        const publicRoutes = ['/api/v1/auth/login', '/api/v1/auth/signup', '/'];
        if (!publicRoutes.includes(`${req.originalUrl}`)) {
            const authHeader = req.get("Authorization");
            if (!authHeader) {
                res.status(401).json({ message: 'not authenticated' });
            }
            ;
            const token = authHeader.split(' ')[1];
            let decodedToken;
            try {
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
                if (!decodedToken) {
                    res.status(401).json({ message: 'unauthorized' });
                }
                else {
                    req.user = decodedToken;
                    next();
                }
                ;
            }
            catch (err) {
                res.status(500).json({ message: err.message || 'could not decode the token' });
            }
            ;
        }
        else {
            next();
        }
    };
    app.use(validateUser);
    app.get("/", (_, res) => {
        res.send("Hello world");
    });
    app.use('/api/v1/user', user);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/group', group);
    app.use('/api/v1/restaurant', restaurant);
    app.use('/api/v1/vote', vote);
    app.use((_, res) => {
        res.status(404).json({ status: "404" });
    });
    const cronJob = new cron.CronJob("0 */01 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default.get('https://foodzillary.herokuapp.com/').then((res) => {
            console.log(`url: prod, response-ok: ${res.statusText}, status: ${res.status}`);
        }).catch((err) => console.log(err));
        yield axios_1.default.get('https://dev-foodzillary.herokuapp.com/').then((res) => {
            console.log(`url: dev, response-ok: ${res.statusText}, status: ${res.status}`);
        }).catch((err) => console.log(err));
    }));
    cronJob.start();
    app.listen(process.env.PORT, () => {
        console.log(`???? Server ready at http://localhost:${process.env.PORT}`);
    });
});
main();
//# sourceMappingURL=index.js.map