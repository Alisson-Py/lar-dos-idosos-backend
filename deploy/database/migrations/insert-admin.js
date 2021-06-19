"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModels_1 = __importDefault(require("../../app/models/UserModels"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = async () => {
    try {
        const user = await UserModels_1.default.findOne({ email: process.env.EMAIL });
        if (!user)
            await UserModels_1.default.create({
                id: uuid_1.v4(),
                firstName: process.env.USER_FIRST_NAME,
                lastName: process.env.USER_LAST_NAME,
                email: process.env.USER_EMAIL,
                passwordWash: await bcrypt_1.default.hash(process.env.USER_PASSWORD || '', await bcrypt_1.default.genSalt(10)),
                userLevel: 'owner',
            });
    }
    catch (err) {
        console.log({ logMigration: err.message });
        throw err;
    }
};
