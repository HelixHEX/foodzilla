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
    const { name } = body;
    try {
        let group = yield prisma.group.create({
            data: {
                name,
                creatorId: req.user.userId,
                users: { connect: { id: req.user.userId } }
            }
        });
        res.json({ success: true, id: group.id }).status(200);
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
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { users: true, voteSessions: { include: { votes: true } } } });
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                yield prisma.group.update({ where: { id: groupId }, data: { users: { disconnect: { id: req.user.userId } } } });
                let sessionIds = group.voteSessions.map(session => { return { id: session.id }; });
                let voteIds = [];
                group.voteSessions.forEach(session => {
                    session.votes.forEach(vote => {
                        if (vote.userId === req.user.userId) {
                            voteIds.push({ id: vote.id });
                        }
                    });
                });
                console.log(yield prisma.user.update({ where: { id: req.user.userId }, data: { voteSessions: { disconnect: sessionIds }, votes: { deleteMany: voteIds } } }));
                res.json({ success: true }).status(200);
            }
            else {
                console.log('hi');
                res.json({ success: false, message: 'Already left' }).status(400);
            }
        }
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
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { restaurants: true, users: { select: { id: true, name: true } }, voteSessions: { include: { users: { select: { id: true, name: true } } } } } });
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                res.json({ success: true, group }).status(200);
            }
            else {
                res.json({ success: false, message: 'Not a member of group' }).status(403);
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
router.post('/saved-restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId } = body;
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { users: true, restaurants: true } });
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                res.json({ success: true, restaurants: group.restaurants }).status(200);
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
router.post('/add-member', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId, email } = body;
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { users: true, voteSessions: true } });
        if (group) {
            if (group.creatorId === req.user.userId) {
                if (!group.users.find(user => user.email === email)) {
                    const user = yield prisma.user.findFirst({ where: { email } });
                    if (user) {
                        yield prisma.group.update({ where: { id: groupId }, data: { users: { connect: { id: user.id } } } });
                        const sessions = yield prisma.vote_Session.findMany({ where: { createdBy: req.user.userId } });
                        let ids = sessions.map(session => { return { id: session.id }; });
                        yield prisma.user.update({ where: { id: req.user.userId }, data: { voteSessions: { connect: ids } } });
                        res.json({ success: true }).status(200);
                    }
                    else {
                        res.json({ success: false, message: 'User not found' }).status(404);
                    }
                }
                else {
                    res.json({ success: false, message: 'User already a member' }).status(400);
                }
            }
            else {
                res.json({ success: false, message: 'Only the creator can create a group' }).status(304);
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