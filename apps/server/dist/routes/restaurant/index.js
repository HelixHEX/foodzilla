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
const axios = require('axios');
const router = express_1.default.Router();
router.post('/search/trending/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { categorySet, lon, lat, radius } = body;
    try {
        if (categorySet) {
            yield axios.get(`${process.env.TOMTOMURL}/poiSearch/.json?key=${process.env.TOMTOMURL}&categorySet=${categorySet}&lon=${lon}&lat=${lat}&radius=${radius}`).then((response) => {
                if (response.data.summary) {
                    console.log(response.data.summary);
                    res.json({ success: true, results: response.data.results });
                }
                else {
                    console.log(response.data.errorText);
                    res.json({ success: false, message: 'An error has occurred' });
                }
            });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, message: "An error has occurred" }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map