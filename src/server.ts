import express from 'express';
import routes from './app/Routes';
import cors from 'cors';
import connection from './database/connection';
import path from 'path';

const app = express();

connection();

app.use(cors({}));
app.use(express.json());
app.use(routes);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3333);