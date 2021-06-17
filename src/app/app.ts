import express from 'express';
import routes from './Routes';
import cors from 'cors';
import connection from '../database/connection';
import path from 'path';

const app = express();

connection();

app.use(cors({}));
app.use(express.json({limit: '50mb'}));
app.use(routes);
app.use('/public', express.static(path.join(__dirname, 'public')));

export default app;