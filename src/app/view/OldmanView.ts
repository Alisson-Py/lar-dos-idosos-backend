import { OldmanModelTypes } from '../models/OldmanModels';

interface OldmanViewInputTypes extends OldmanModelTypes {};

interface OldmanViewOutputTypes {
  id: String;
  name: String;
  age: Number;
  cpf: number;
  rg: number;
  gender: String;
  avatar?: String;
  isDisease: Boolean;
  disease?: string[];
  medicine?: {
    name: string[],
    quant: string[],
    times: string[]
  };
  deleted: boolean
};

export function OldmanViewSingle(oldman: OldmanViewInputTypes): OldmanViewOutputTypes {
  return {
    id: oldman.id,
    name: oldman.name,
    age: oldman.age,
    cpf: oldman.cpf,
    rg: oldman.rg,
    gender: oldman.gender,
    avatar: oldman.avatar,
    isDisease: oldman.isDisease,
    disease: oldman.disease,
    medicine: oldman.medicine,
    deleted: oldman.deleted
  }
};

export function OldmanViewMany(oldmans: Array<OldmanViewInputTypes>): Array<OldmanViewOutputTypes> {
  return oldmans.map((oldman) => {
    return OldmanViewSingle(oldman);
  })
};