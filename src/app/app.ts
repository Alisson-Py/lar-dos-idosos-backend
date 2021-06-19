import express from 'express';
import routes from './Routes';
import cors from 'cors';
import connection from '../database/connection';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config();

const app = express();

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME
});

connection();

app.use(cors({}));
app.use(express.json({limit: '50mb'}));
app.use(routes);
app.use('/public', express.static(path.join(__dirname, 'public')));

export default app;