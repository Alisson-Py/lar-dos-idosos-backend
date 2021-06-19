"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldmanViewMany = exports.OldmanViewSingle = void 0;
;
;
function OldmanViewSingle(oldman) {
    return {
        id: oldman.id,
        name: oldman.name,
        age: oldman.age,
        cpf: oldman.cpf,
        rg: oldman.rg,
        gender: oldman.gender,
        avatar: oldman.avatar,
        isDisease: oldman.isDisease,
        disease: oldman.disease,
        medicine: oldman.medicine,
        deleted: oldman.deleted
    };
}
exports.OldmanViewSingle = OldmanViewSingle;
;
function OldmanViewMany(oldmans) {
    return oldmans.map((oldman) => {
        return OldmanViewSingle(oldman);
    });
}
exports.OldmanViewMany = OldmanViewMany;
;
