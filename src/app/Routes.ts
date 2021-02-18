import {Router} from 'express';
import multer from 'multer';
import {config} from 'dotenv';

import staticImagesPath from '../config/staticImagesPath';
import OldmanControllers from './controllers/OldmanController';
import UserControllers from './controllers/UserControllers';
import AdminControllers from './controllers/AdminControllers';

config()

const imageConfig = multer(staticImagesPath);


const routes = Router();
const Oldman = new OldmanControllers;
const User = new UserControllers;
const Admin = new AdminControllers;

routes.get('/', (req, res) => (res.json({ok: 'server running'})));

routes.get('/list', Oldman.Index);
routes.post('/create', imageConfig.single('image'), Oldman.Store);
routes.get('/oldman/:id', imageConfig.single('image'), Oldman.Show);

routes.get('/login', User.Login);
routes.post('/register', User.Create);

routes.get(`/admin/find/${process.env.ROUTE_ADMIN}`, Admin.Users);
routes.get(`/admin/delete/${process.env.ROUTE_ADMIN}`, Admin.Delete);


export default routes;