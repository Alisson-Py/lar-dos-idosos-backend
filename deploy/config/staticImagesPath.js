"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const path_1 = require("path");
exports.default = {
    storage: multer_1.diskStorage({
        destination: path_1.join(__dirname, '..', 'public'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname.trim()}`;
            cb(null, fileName);
        },
    }),
};
