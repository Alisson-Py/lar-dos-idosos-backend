"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModels_1 = __importDefault(require("../models/UserModels"));
const crypto_1 = __importDefault(require("crypto"));
class UserControllers {
    async Login(req, res) {
        const credential = req.headers.authorization;
        if (!credential)
            return res.status(401).json({ err: 'Data not recieve' });
        const [basic, contentHash] = credential.split(' ');
        const [email, password] = Buffer.from(contentHash, 'base64')
            .toString()
            .split(':');
        try {
            const user = await UserModels_1.default.findOne({ email });
            if (!user)
                return res.status(404).json({
                    err: 'Email not found'
                });
            const pswHash = crypto_1.default.createHash('md5').update(password).digest('base64');
            if (pswHash !== user.passwordWash)
                return res.status(401).json({
                    err: 'Incorrect Password',
                });
            return res.status(200).json({
                id: user._id,
                name: user.name,
            });
        }
        catch (error) {
            return res.status(500).send();
        }
    }
    ;
    async Create(req, res) {
        const { name, email, password } = req.body;
        try {
            const pswHash = crypto_1.default.createHash('md5').update(password).digest('base64');
            await UserModels_1.default.create({
                name,
                email,
                passwordWash: pswHash
            });
            return res.status(200).json({ created: true });
        }
        catch (err) {
            return res.status(500).send();
        }
    }
}
exports.default = UserControllers;
