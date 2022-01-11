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
                if (user) {
                    users.push(user);
                }
                else
                    emailError = true;
            }
        }
        if (!emailError) {
            users.push(req.user);
            console.log(req.user.userId);
            let group = yield prisma.group.create({
                data: {
                    name,
                    creatorId: req.user.userId,
                    users: { connect: { id: req.user.userId } }
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
router.post('/all-groups-admin', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield prisma.group.findMany({ include: { users: { select: { id: true, name: true } } } });
    res.json({ groups });
}));
router.post('/active-groups', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { id: req.user.userId }, include: { groups: { where: { active: true }, include: { users: { select: { id: true, name: true } } } } } });
        res.json({ success: true, groups: user.groups }).status(200);
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
router.post('/leave-group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId } = body;
    try {
        yield prisma.group.update({ where: { id: groupId }, data: { users: { disconnect: { id: req.user.userId } } } });
        res.json({ success: true }).status(200);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/delete-group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId } = body;
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId } });
        if (group) {
            if (group.creatorId === req.user.userId) {
                yield prisma.group.delete({ where: { id: groupId } });
                res.json({ success: true }).status(200);
            }
            else {
                res.json({ success: false, message: 'Only the creator can delete a group' }).status(403);
            }
        }
        else
            res.json({ success: false, message: "Group not found" }).status(404);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let { id: groupId } = body;
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { restaraunts: true, users: { select: { id: true, name: true } }, voteSessions: { include: { users: { select: { id: true, name: true } } } } } });
        if (group) {
            res.json({ success: true, group }).status(200);
        }
        else {
            res.json({ success: false, message: 'Group not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/saved-restaraunts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId } = body;
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { users: true, restaraunts: true } });
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                res.json({ success: true, restaraunts: group.restaraunts }).status(200);
            }
            else {
                res.json({ success: false, message: "Not a member of group" }).status(403);
            }
        }
        else {
            res.json({ success: false, message: 'Group not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map