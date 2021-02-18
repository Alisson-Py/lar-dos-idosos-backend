import {Document, Schema, model} from 'mongoose';

export interface UserModels extends Document {
  name: String;
  email: String;
  passwordWash: String;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  passwordWash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


export default model<UserModels>('User', UserSchema);