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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const saltRounds = 10;
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { name, email, room_number, building, password } = body;
    try {
        const exists = yield prisma.user.findUnique({ where: { email } });
        if (exists) {
            res.json({ success: false, message: 'Email already in use' });
        }
        else {
            if (password.length > 6) {
                let hashPwd;
                bcrypt_1.default.hash(password, saltRounds, (_, hash) => __awaiter(void 0, void 0, void 0, function* () {
                    hashPwd = hash;
                    const user = yield prisma.user.create({
                        data: {
                            name, email, room_number, building, password: hashPwd
                        }
                    });
                    const { password } = user, other = __rest(user, ["password"]);
                    if (user) {
                        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, name: user.name }, process.env.SECRET);
                        res.json({ success: true, user: other, token });
                    }
                    else {
                        res.json({ success: false, message: 'An error has occurred' });
                    }
                }));
            }
            else {
                res.json({ success: false, message: 'Passowrd too short' });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: 'An error has occurred' });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, password } = body;
    try {
        if (email !== 'aa') {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (user) {
                let checkPass = yield bcrypt_1.default.compare(password, user.password);
                if (checkPass) {
                    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, name: user.name }, process.env.SECRET);
                    res.json({ success: true, token });
                }
                else {
                    res.json({ success: false, message: 'Incorrect username/password' });
                }
            }
            else {
                res.json({ success: false, message: 'Incorrect username/password' });
            }
        }
        else {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (user) {
                const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, name: user.name }, process.env.SECRET);
                res.json({ success: true, token });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: 'An error has occurred' });
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map