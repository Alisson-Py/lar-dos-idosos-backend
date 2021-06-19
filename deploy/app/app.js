"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./Routes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const app = express_1.default();
cloudinary_1.v2.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
});
connection_1.default();
app.use(cors_1.default({}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(Routes_1.default);
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.default = app;
