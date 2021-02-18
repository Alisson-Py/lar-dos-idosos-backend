import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const uri = process.env.DB_URI || 'no';

const connection = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('DB Connect Successful')
  }).catch(err => {
    console.log(err);
  });
}

export default connection;