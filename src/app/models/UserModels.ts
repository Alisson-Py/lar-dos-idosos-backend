import {Document, Schema, model} from 'mongoose';

export interface UserModelTypes extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordWash: string;
  userLevel: "owner" | "admin" | "user";
  deleted: boolean;
  createdAt: Date;
  updateAt: Date;
}

const UserSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  userLevel: {
    type: String,
    required: true,
  },
  passwordWash: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }
});


export default model<UserModelTypes>('User', UserSchema);