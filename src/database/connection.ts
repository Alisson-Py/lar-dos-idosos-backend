import mongoose from 'mongoose';
import dotenv from 'dotenv';
import insertAdmin from './migrations/insert-admin';

dotenv.config()
const uri = process.env.DB_URI || 'no';

const connection = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(async () => {
    console.log('DB Connect Successful');
    await insertAdmin();
  }).catch(err => {
    console.log({log: err.message});
  });
}

export default connection;