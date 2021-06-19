"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
const OldmanController_1 = __importDefault(require("./controllers/OldmanController"));
const UserControllers_1 = __importDefault(require("./controllers/UserControllers"));
const authentication_1 = __importDefault(require("./middlewares/authentication"));
const Oldman = new OldmanController_1.default;
const User = new UserControllers_1.default;
routes.get('/', (req, res) => (res.json({ ok: 'server running' })));
routes.get('/v1/login', User.Login);
routes.get('/v1/users/show', User.Index);
routes.get('/v1/users/details/:id', User.Show);
routes.post('/v1/users/create', User.Store);
routes.put('/v1/users/update/:id', authentication_1.default, User.Update);
routes.delete('/v1/users/delete/:id', authentication_1.default, User.Delete);
routes.get('/v1/oldman/show', Oldman.Index);
routes.get('/v1/oldman/details/:id', Oldman.Show);
routes.post('/v1/oldman/create', authentication_1.default, Oldman.Store);
routes.put('/v1/oldman/update/:id', authentication_1.default, Oldman.Update);
routes.delete('/v1/oldman/delete/:id', authentication_1.default, Oldman.Delete);
exports.default = routes;
