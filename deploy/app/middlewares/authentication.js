"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).json({ err: 'auth not found' });
    const [baerer, token] = auth.split(' ');
    if (!token)
        return res.status(401).json({ err: 'token not found' });
    jsonwebtoken_1.default.verify(token, process.env.SECRET || 'secret string', (err, decode) => {
        if (err)
            return res.status(401).json({ err: 'token invalid' });
        req.body.auth = {
            id: decode.id,
            userLevel: decode.userLevel
        };
    });
    next();
};
