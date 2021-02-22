"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldmanViewMany = exports.OldmanViewSingle = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
function OldmanViewSingle(object) {
    return object === [] ? {} : {
        id: object._id,
        name: object.name,
        age: object.age,
        gender: object.gender,
        avatar: object.avatar,
        isDisease: object.isDisease,
        disease: object.disease,
        medicine: reconstructionMedicine(object.medicine, object.medicineQuant, object.medicineTimes),
    };
}
exports.OldmanViewSingle = OldmanViewSingle;
;
function OldmanViewMany(arrayObject) {
    return arrayObject === [] ? [] : arrayObject.map((item) => {
        return OldmanViewSingle(item);
    });
}
exports.OldmanViewMany = OldmanViewMany;
;
function reconstructionMedicine(name, quant, time) {
    if (!name)
        return [];
    const med = name.map((i, index) => {
        return {
            name: name[index],
            medicineQuant: time[index],
            medicineTimes: quant[index]
        };
    });
    return med;
}
