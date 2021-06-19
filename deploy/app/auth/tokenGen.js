"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = (param) => {
    return jsonwebtoken_1.default.sign(param, process.env.SECRET || 'secret string', {
        expiresIn: '4h'
    });
};
