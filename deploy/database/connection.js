"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const insert_admin_1 = __importDefault(require("./migrations/insert-admin"));
dotenv_1.default.config();
const uri = process.env.DB_URI || 'no';
const connection = () => {
    mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(async () => {
        console.log('DB Connect Successful');
        await insert_admin_1.default();
    }).catch(err => {
        console.log({ log: err.message });
    });
};
exports.default = connection;
