"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OldmanSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['m', 'f'],
        required: true
    },
    isDisease: {
        type: Boolean,
        required: true,
    },
    disease: {
        type: Array
    },
    medicine: {
        type: Array,
    },
    medicineTimes: {
        type: Array,
    },
    medicineQuant: {
        type: Array,
    },
    avatar: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.model('Oldman', OldmanSchema);
