"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OldmanSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    cpf: {
        type: String,
        required: true
    },
    rg: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
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
        name: {
            type: [String]
        },
        quant: {
            type: [String]
        },
        times: {
            type: [String]
        },
    },
    deleted: {
        type: Boolean,
        default: false
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
