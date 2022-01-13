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
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const categorySets_1 = require("../../utils/categorySets");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post('/search/:query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { categorySet, query, lon, lat, radius, offset, limit } = body;
    try {
        if (categorySet) {
            yield axios_1.default.get(`${process.env.TOMTOMURL}/poiSearch/${query}.json?key=${process.env.TOMTOMAPIKEY}&categorySet=${categorySet}&lon=${lon}&lat=${lat}&radius=${radius}&ofs=${offset}&limit=${limit}`).then((response) => {
                if (response.data.summary) {
                    console.log(response.data.summary);
                    const remaining = response.data.summary.totalResults <= 1900 ? response.data.summary.totalResults - (offset + 20) < 0 ? 0 : response.data.summary.totalResults - (offset + 20) : offset < 1900 ? 1900 - (offset + 20) : 0;
                    res.json({ success: true, results: response.data.results, remaining }).status(200);
                }
                else {
                    res.json({ success: false, message: 'An error has occurred' }).status(400);
                }
            });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/search/trending/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { categorySet, lon, lat, radius, limit, offset } = body;
    try {
        if (categorySet) {
            yield axios_1.default.get(`${process.env.TOMTOMURL}/poiSearch/.json?key=${process.env.TOMTOMAPIKEY}&categorySet=${categorySet}&lon=${lon}&lat=${lat}&radius=${radius}&limit=${limit}&ofs=${offset}`).then((response) => {
                if (response.data.summary) {
                    console.log(response.data.summary);
                    const remaining = response.data.summary.totalResults <= 1900 ? response.data.summary.totalResults - (offset + 20) : offset < 1900 ? 1900 - (offset + 20) : 0;
                    res.json({ success: true, results: response.data.results, remaining }).status(200);
                }
                else {
                    console.log(response.data.errorText);
                    res.json({ success: false, message: 'An error has occurred' }).status(400);
                }
            });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
router.post('/save-to-group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId, restarauntInfo } = body;
    console.log(restarauntInfo);
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { restaurants: true, users: true } });
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                if (!group.restaurants.find(restaurant => restaurant.tomtom_id == restarauntInfo.id)) {
                    const restaurant = yield prisma.restaurant.findFirst({ where: { tomtom_id: restarauntInfo.id } });
                    if (restaurant) {
                        yield prisma.group.update({ where: { id: groupId }, data: { restaurants: { connect: { id: restaurant.id } } } });
                    }
                    else {
                        yield prisma.restaurant.create({
                            data: {
                                tomtom_id: restarauntInfo.id,
                                name: restarauntInfo.name,
                                type: categorySets_1.categorySets.find((category) => category.categorySet === restarauntInfo.categorySet).name,
                                lon: restarauntInfo.lon,
                                lat: restarauntInfo.lat,
                                address: restarauntInfo.address,
                                categorySet: restarauntInfo.categorySet,
                                url: restarauntInfo.url,
                                phone: restarauntInfo.phone,
                                groups: { connect: { id: groupId } }
                            }
                        });
                    }
                    res.json({ success: true }).status(200);
                }
                else {
                    res.json({ success: false, message: 'Restaraunt already saved' }).status(400);
                }
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
router.post('/unsave-from-group', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { groupId, restarauntId } = body;
    try {
        const group = yield prisma.group.findUnique({ where: { id: groupId }, include: { users: true, restaurants: true } });
        if (group) {
            if (group.users.find(user => user.id === req.user.userId)) {
                const restaurant = yield prisma.restaurant.findUnique({ where: { id: restarauntId } });
                if (restaurant) {
                    console.log(group.restaurants);
                    if (group.restaurants.find(oldRestaurant => oldRestaurant.id == restaurant.id)) {
                        yield prisma.group.update({ where: { id: groupId }, data: { restaurants: { disconnect: { id: restaurant.id } } } });
                        res.json({ success: true }).status(200);
                    }
                    else {
                        res.json({ success: false, message: 'Restaraunt already removed' }).status(404);
                    }
                }
                else {
                    res.json({ success: false, message: 'Restaraunt not found' }).status(404);
                }
            }
            else {
                console.log(group.users);
                console.log(req.user.userId);
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
router.post('/save-to-account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { restarauntInfo } = body;
    try {
        const user = yield prisma.user.findUnique({ where: { id: req.user.userId }, include: { saved_restaraunts: true } });
        if (user) {
            if (!user.saved_restaraunts.find(restaurant => restaurant.tomtom_id == restarauntInfo.id)) {
                const restaurant = yield prisma.restaurant.findFirst({ where: { tomtom_id: restarauntInfo.id } });
                if (restaurant) {
                    yield prisma.user.update({ where: { id: req.user.userId }, data: { saved_restaraunts: { connect: { id: restaurant.id } } } });
                }
                else {
                    yield prisma.restaurant.create({
                        data: {
                            tomtom_id: restarauntInfo.id,
                            name: restarauntInfo.name,
                            type: categorySets_1.categorySets.find((category) => category.categorySet === restarauntInfo.categorySet).name,
                            lon: restarauntInfo.lon,
                            lat: restarauntInfo.lat,
                            address: restarauntInfo.address,
                            categorySet: restarauntInfo.categorySet,
                            url: restarauntInfo.url,
                            phone: restarauntInfo.phone,
                            users: { connect: { id: req.user.userId } }
                        }
                    });
                }
                res.json({ success: true }).status(200);
            }
            else
                res.json({ success: false, message: "Restaraunt already saved" }).status(400);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map