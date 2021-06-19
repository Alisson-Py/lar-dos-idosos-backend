"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModels_1 = __importDefault(require("../models/UserModels"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const tokenGen_1 = __importDefault(require("../auth/tokenGen"));
class UserControllers {
    async Login(req, res) {
        const credential = req.headers.authorization;
        try {
            if (!credential)
                return res.status(401).json({ err: 'Data not recieve' });
            const [, contentHash] = credential.split(' ');
            const [email, password] = Buffer.from(contentHash, 'base64').toString().split(':');
            const user = await UserModels_1.default.findOne({ email });
            if (!user)
                return res.status(404).json({
                    err: 'Email not found'
                });
            if (!await bcrypt_1.default.compare(password, user.passwordWash))
                return res.status(401).json({ err: 'Incorrect Password' });
            return res.json({
                id: user.id,
                fistName: user.firstName,
                lastName: user.lastName,
                userLevel: user.userLevel,
                token: tokenGen_1.default({
                    id: user.id,
                    userLevel: user.userLevel
                })
            });
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500).send();
        }
    }
    ;
    async Index(req, res) {
        try {
            const users = await UserModels_1.default.find({
                deleted: false
            });
            if (!users)
                return res.json(['not found']);
            return res.json(users);
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500);
        }
        ;
    }
    ;
    async Show(req, res) {
        const id = req.params.id;
        try {
            const user = await UserModels_1.default.findOne({
                id,
                deleted: false
            });
            if (!user)
                return res.status(401).json({ err: 'user not found' });
            return res.json(user);
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500);
        }
        ;
    }
    ;
    async Store(req, res) {
        const { firstName, lastName, email, password, userLevel, auth } = req.body;
        try {
            // if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin')) return res.status(401).json({err: 'access denied'})
            await UserModels_1.default.create({
                id: uuid_1.v4(),
                firstName,
                lastName,
                email,
                passwordWash: await bcrypt_1.default.hash(password, await bcrypt_1.default.genSalt(10)),
                userLevel
            });
            return res.json({ created: true });
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500);
        }
        ;
    }
    ;
    async Update(req, res) {
        const { auth } = req.body;
        try {
            if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin'))
                return res.status(401).json({ err: 'access denied' });
            return res.json({ show: true });
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500);
        }
        ;
    }
    ;
    async Delete(req, res) {
        const id = req.params.id;
        const { auth } = req.body;
        try {
            if (!(auth.userLevel === 'owner'))
                return res.status(401).json({ err: 'access denied' });
            const user = await UserModels_1.default.findOne({
                id,
                deleted: false
            });
            if (!user)
                return res.status(400).json({ err: 'user not found' });
            await UserModels_1.default.updateOne({
                id,
                deleted: false
            }, {
                deleted: true
            });
            return res.json({ show: true });
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500);
        }
        ;
    }
    ;
}
exports.default = UserControllers;
