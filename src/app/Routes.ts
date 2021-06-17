import {Router} from 'express';
const routes = Router();

import OldmanControllers from './controllers/OldmanController';
import UserControllers from './controllers/UserControllers';

const Oldman = new OldmanControllers;
const User = new UserControllers;

routes.get('/', (req, res) => (res.json({ok: 'server running'})));

routes.get('/v1/login', User.Login);

routes.get('/v1/users/show', User.Index);
routes.get('/v1/users/details', User.Show);
routes.post('/v1/users/create', User.Store);
routes.put('/v1/users/update', User.Update);
routes.delete('/v1/users/delete', User.Delete);

routes.get('/v1/oldman/show', Oldman.Index);
routes.get('/v1/oldman/details', Oldman.Show);
routes.get('/v1/oldman/create', Oldman.Store);
routes.get('/v1/oldman/update', Oldman.Update);
routes.get('/v1/oldman/delete', Oldman.Delete);

export default routes;