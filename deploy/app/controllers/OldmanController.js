"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OldmanModels_1 = __importDefault(require("../models/OldmanModels"));
const OldmanView_1 = require("../View/OldmanView");
const dotenv_1 = __importDefault(require("dotenv"));
class OldmanControllers {
    async Index(req, res) {
        const data = await OldmanModels_1.default.find();
        return res.json(OldmanView_1.OldmanViewMany(data));
    }
    ;
    async Show(req, res) {
        const id = req.params.id;
        const data = await OldmanModels_1.default.findOne({ _id: id });
        if (!data)
            return res.status(404).json({ err: 'oldman not found' });
        return res.json(OldmanView_1.OldmanViewSingle(data));
    }
    ;
    async Store(req, res) {
        dotenv_1.default.config();
        const { name, age, gender, isDisease, disease, medicine, medicineQuant, medicineTimes } = req.body;
        const requestImages = req.file;
        await OldmanModels_1.default.create({
            name,
            age,
            gender,
            isDisease: isDisease,
            disease: disease ? JSON.parse(disease) : null,
            medicine: medicine ? JSON.parse(medicine) : null,
            medicineQuant: medicineQuant ? JSON.parse(medicineQuant) : null,
            medicineTimes: medicineTimes ? JSON.parse(medicineTimes) : null,
            avatar: requestImages.filename
        });
        return res.status(202).send();
    }
}
exports.default = OldmanControllers;
