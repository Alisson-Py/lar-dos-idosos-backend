import {Document, Schema, model} from 'mongoose';

export interface OldmanModelTypes extends Document {
  id: string;
  name: string;
  age: Number;
  gender: 'M' | 'F';
  cpf: number;
  rg: number;
  isDisease: Boolean;
  disease?: Array<string>
  medicine?: {
    name: string[];
    quant: string[];
    times: string[];
  };
  deleted: boolean;
  avatar?: string;
}

const OldmanSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  cpf: {
    type: String,
    required: true
  },
  rg: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
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
    name: {
      type: [String]
    },
    quant: {
      type: [String]
    },
    times: {
      type: [String]
    },
  },
  deleted: {
    type: Boolean,
    default: false
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