import {Router} from 'express';
const routes = Router();

import OldmanControllers from './controllers/OldmanController';
import UserControllers from './controllers/UserControllers';

const Oldman = new OldmanControllers;
const User = new UserControllers;

routes.get('/', (req, res) => (res.json({ok: 'server running'})));

routes.get('/v1/login', User.Login);

routes.get('/v1/users/show', User.Index);
routes.get('/v1/users/details/:id', User.Show);
routes.post('/v1/users/create', User.Store);
routes.put('/v1/users/update/:id', User.Update);
routes.delete('/v1/users/delete/:id', User.Delete);

routes.get('/v1/oldman/show', Oldman.Index);
routes.get('/v1/oldman/details/:id', Oldman.Show);
routes.post('/v1/oldman/create', Oldman.Store);
routes.put('/v1/oldman/update/:id', Oldman.Update);
routes.delete('/v1/oldman/delete/:id', Oldman.Delete);

export default routes;