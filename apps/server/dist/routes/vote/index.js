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
router.post('/new-voting-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId, name, add_options } = body;
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { users: { select: { id: true, name: true } } } });
        if (group) {
            let exists = group.users.find(user => user.id === req.user.userId);
            if (exists) {
                let session = yield prisma.vote_Session.create({
                    data: {
                        createdBy: req.user.userId,
                        group: { connect: { id: group.id } },
                        name,
                        add_options,
                        users: { connect: { id: req.user.userId } }
                    }
                });
                res.json({ success: true, id: session.id }).status(200);
            }
            else {
                res.json({ success: false, message: 'Invalid access' }).status(403);
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
router.post('/all-voting-sessions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user.userId);
        const sessions = yield prisma.vote_Session.findMany({ where: { group: { users: { some: { id: req.user.userId } } } }, include: { users: { select: { id: true, email: true, name: true } }, group: true } });
        if (sessions) {
            console.log(sessions);
            res.json({ success: true, sessions }).status(200);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/end-voting-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { votes: true } });
        if (session) {
            if (!session.ended) {
                if (session.createdBy === req.user.userId) {
                    let votes = [{ restaraunt_name: 'Wendys', votes: 1 }, { restaraunt_name: 'Chic-fil-a', votes: 4 }, { restaraunt_name: 'Jack in the box', votes: 2 }];
                    session.votes.forEach(vote1 => {
                        let index = votes.findIndex((vote) => vote.restaraunt_name === vote1.restaraunt_name);
                        if (index >= 0) {
                            votes[index].votes += 1;
                        }
                        else {
                            votes.push({
                                restaraunt_name: vote1.restaraunt_name,
                                votes: 1
                            });
                        }
                    });
                    votes = votes.sort((a, b) => b.votes - a.votes);
                    yield prisma.vote_Session.update({ where: { id: sessionId }, data: { ended: true } });
                    res.json({ success: true, votes }).status(200);
                }
                else {
                    res.json({ success: false, message: 'Only the creator can end a session' }).status(403);
                }
            }
            else {
                res.json({ success: false, message: 'Vote session already ended' }).status(400);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/open-voting-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { votes: true } });
        if (session) {
            if (session.ended) {
                if (session.createdBy === req.user.userId) {
                    yield prisma.vote_Session.update({ where: { id: sessionId }, data: { ended: false } });
                    res.json({ success: true }).status(200);
                }
                else {
                    res.json({ success: false, message: 'Only the creator can end a session' }).status(403);
                }
            }
            else {
                res.json({ success: false, message: 'Vote session already opened' }).status(400);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/join-voting-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId } = body;
    try {
        const voteSession = yield prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { group: { include: { users: { select: { id: true, name: true } } } }, users: { select: { id: true, name: true } } } });
        if (voteSession) {
            if (voteSession.group.users.find(user => user.id === req.user.userId)) {
                if (!voteSession.users.find(user => user.id === req.user.userId)) {
                    yield prisma.vote_Session.update({ where: { id: sessionId }, data: { users: { connect: { id: req.user.userId } } } });
                    res.json({ success: true }).status(200);
                }
                else {
                    res.json({ success: false, message: 'Already a member of the group' }).status(400);
                }
            }
            else {
                res.json({ success: false, message: 'Not a member of the group' }).status(404);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/place-vote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId, vote } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { users: { select: { id: true, name: true } }, votes: { select: { id: true, user: { select: { id: true, name: true } } } } } });
        if (session) {
            if (!session.ended) {
                if (session.users.find(user => user.id === req.user.userId)) {
                    let findVote = session.votes.find(voter => voter.user.id === req.user.userId);
                    if (!findVote) {
                        if (session.restaurants.find(option => option === vote)) {
                            yield prisma.vote.create({
                                data: {
                                    user: { connect: { id: req.user.userId } },
                                    restaraunt_name: vote,
                                    VoteSession: { connect: { id: session.id } }
                                }
                            });
                            res.json({ success: true }).status(200);
                        }
                        else {
                            res.json({ success: false, message: 'Restaraunt not found' }).status(404);
                        }
                    }
                    else {
                        yield prisma.vote.update({ where: { id: findVote.id }, data: { restaraunt_name: vote } });
                        res.json({ success: true }).status(200);
                    }
                }
                else {
                    res.json({ success: false, message: 'You have not joined the session' }).status(403);
                }
            }
            else {
                res.json({ success: false, message: 'Voting session has ended' }).status(400);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/all-votes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { votes: { include: { user: { select: { id: true, name: true } } } }, users: { select: { id: true, name: true } } } });
        if (session) {
            if (session.users.find(user => user.id === req.user.userId)) {
                if (!session.anonymous) {
                    res.json({ success: true, votes: session.votes }).status(200);
                }
                else {
                    res.json({ success: false, message: 'Anonymous voting session' }).status(403);
                }
            }
            else {
                res.json({ success: false, message: 'You have not joined the session' }).status(403);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/delete', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.vote.deleteMany();
}));
router.post('/add-option', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId, vote } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { users: true } });
        if (session) {
            if (session.users.find(user => user.id === req.user.userId)) {
                if (session.add_options || session.createdBy === req.user.userId) {
                    if (!session.restaurants.find(restaurant => restaurant === vote)) {
                        yield prisma.vote_Session.update({ where: { id: sessionId }, data: { restaurants: [...session.restaurants, vote] } });
                        res.json({ success: true }).status(200);
                    }
                    else {
                        res.json({ success: false, message: 'Option already added' }).status(400);
                    }
                }
                else {
                    res.json({ success: false, message: 'New options can\'t be added' }).status(403);
                }
            }
            else {
                res.json({ success: false, message: 'You have not joined this session' }).status(404);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/session/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id }, include: { users: { select: { id: true, name: true } }, votes: { include: { user: { select: { id: true, name: true } } } } } });
        if (session) {
            if (session.users.find(user => user.id === req.user.userId) || session.ended) {
                res.json({ success: true, session }).status(200);
            }
            else
                res.json({ success: false, message: 'Invalid access' }).status(403);
        }
        else
            res.json({ success: false, message: 'Vote session not found' }).status(404);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/leave-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id: sessionId }, include: { users: true } });
        if (session) {
            if (session.users.find(user => user.id === req.user.userId)) {
                yield prisma.vote_Session.update({ where: { id: sessionId }, data: { users: { disconnect: { id: req.user.userId } } } });
                res.json({ success: true }).status(200);
            }
            else {
                res.json({ success: false, message: 'Have not joined session' }).status(400);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/toggle-add-options', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { sessionId } = body;
    try {
        const session = yield prisma.vote_Session.findUnique({ where: { id: sessionId } });
        if (session) {
            if (session.createdBy === req.user.userId) {
                yield prisma.vote_Session.update({ where: { id: sessionId }, data: { add_options: !session.add_options } });
                res.json({ success: true }).status(200);
            }
            else {
                res.json({ success: false, message: 'Only the creator can change this setting' }).status(403);
            }
        }
        else {
            res.json({ success: false, message: 'Vote session not found' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map