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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post('/create-group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { emails, name } = body;
    try {
        let users = [];
        let emailError = false;
        for (var email of emails) {
            if (email !== req.user.email) {
                const user = yield prisma.user.findUnique({ where: { email } });
                users.push(user);
            }
            else
                emailError = true;
        }
        if (!emailError) {
            users.push(req.user);
            let group = yield prisma.group.create({
                data: {
                    name,
                    creatorId: req.user.userId,
                    users: { connect: users.map((user) => { return { id: user.id ? user.id : user.userId }; }) }
                }
            });
            res.json({ success: true, group }).status(200);
        }
        else
            res.json({ success: false, message: "One or more emails could not be found" }).status(400);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/all-groups', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield prisma.group.findMany({ include: { users: true } });
    res.json({ groups });
}));
router.post('/active-groups', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield prisma.group.findMany({ where: { active: true, users: { some: { id: req.user.userId } } } });
        res.json({ success: true, groups }).status(200);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/check-user-exists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email } = body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (user) {
            res.json({ success: true }).status(200);
        }
        else {
            res.json({ success: false, message: 'User not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/past-groups', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { id: req.user.userId } });
        if (user) {
            const groups = yield prisma.group.findMany({
                where: {
                    active: false,
                    users: {
                        some: {
                            id: user.id
                        }
                    }
                },
            });
            res.json({ sucess: true, groups }).status(200);
        }
        else {
            res.json({ success: false, message: 'User not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map