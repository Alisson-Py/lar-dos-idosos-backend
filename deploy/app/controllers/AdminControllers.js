"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OldmanModels_1 = __importDefault(require("../models/OldmanModels"));
const UserModels_1 = __importDefault(require("../models/UserModels"));
class AdminControllers {
    async Users(req, res) {
        return res.json(await OldmanModels_1.default.find());
    }
    ;
    async Delete(req, res) {
        await OldmanModels_1.default.deleteMany();
        await UserModels_1.default.deleteMany();
        return res.json({ delete: true });
    }
}
exports.default = AdminControllers;
