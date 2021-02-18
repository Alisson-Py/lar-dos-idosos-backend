import {Document, Schema, model} from 'mongoose';

export interface OldmanModelTypes extends Document {
  name: String;
  age: Number;
  gender: 'm' | 'f';
  isDisease: Boolean;
  disease?: Array<String>
  medicine?: Array<String> | Array<null>;
  medicineQuant?: Array<String> | Array<null>;
  medicineTimes?: Array<String> | Array<null>;
  avatar?: String;
}

const OldmanSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['m', 'f'],
    required: true
  },
  isDisease: {
    type: Boolean,
    required: true,
  },
  disease: {
    type: Array
  },
  medicine: {
    type: Array,
  },
  medicineTimes: {
    type: Array,
  },
  medicineQuant: {
    type: Array,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default model<OldmanModelTypes>('Oldman', OldmanSchema);