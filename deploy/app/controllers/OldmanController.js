"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OldmanModels_1 = __importDefault(require("../models/OldmanModels"));
const OldmanView_1 = require("../view/OldmanView");
const uuid_1 = require("uuid");
const cloudinary_1 = require("cloudinary");
class OldmanControllers {
    async Index(req, res) {
        try {
            const data = await OldmanModels_1.default.find({
                deleted: false
            });
            if (!data)
                return res.json([]);
            return res.json(OldmanView_1.OldmanViewMany(data));
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500).send();
        }
        ;
    }
    ;
    async Show(req, res) {
        const id = req.params.id;
        try {
            const data = await OldmanModels_1.default.findOne({
                id,
                deleted: false
            });
            if (!data)
                return res.status(400).json({ err: 'oldman not found' });
            return res.json(OldmanView_1.OldmanViewSingle(data));
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500).send();
        }
        ;
    }
    ;
    async Store(req, res) {
        const { name, age, gender, cpf, rg, isDisease, disease, medicineName, medicineQuant, medicineTimes, image, auth } = req.body;
        try {
            let imageUrl = '';
            if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin'))
                return res.status(401).json({ err: 'access denied' });
            await cloudinary_1.v2.uploader.upload(image, {
                folder: 'lar-dos-idosos'
            }, (err, cb) => {
                if (err)
                    throw err;
                if (!cb)
                    return;
                imageUrl = cb.url;
            });
            await OldmanModels_1.default.create({
                id: uuid_1.v4(),
                name,
                age,
                cpf,
                rg,
                gender: gender.toUpperCase(),
                isDisease: isDisease,
                disease: disease || null,
                medicine: {
                    name: medicineName,
                    quant: medicineQuant,
                    times: medicineTimes
                },
                avatar: imageUrl
            });
            return res.json({ created: true });
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500).send();
        }
        ;
    }
    ;
    async Update(req, res) {
        const id = req.params.id;
        const { auth } = req.body;
        try {
            if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin'))
                return res.status(401).json({ err: 'access denied' });
            return res.json({ update: id });
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500).send();
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
            await OldmanModels_1.default.updateOne({
                id
            }, {
                deleted: true
            });
            return res.json({ delete: id });
        }
        catch (err) {
            console.log({ log: err.message });
            return res.status(500).send();
        }
        ;
    }
    ;
}
exports.default = OldmanControllers;
;
