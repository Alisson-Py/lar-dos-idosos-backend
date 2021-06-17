import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const uri = process.env.DB_URI || 'no';

const connection = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log('DB Connect Successful')
  }).catch(err => {
    console.log({log: err.message});
  });
}

export default connection;