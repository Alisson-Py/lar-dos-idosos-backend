"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./app/Routes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./database/connection"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
connection_1.default();
app.use(cors_1.default({}));
app.use(express_1.default.json());
app.use(Routes_1.default);
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(process.env.PORT || 3333);
