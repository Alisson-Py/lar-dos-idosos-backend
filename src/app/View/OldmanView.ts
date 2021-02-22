import {config} from 'dotenv';
config();

interface OldmanViewInputTypes {
  _id: String;
  name: String;
  age: Number;
  gender: String;
  avatar: String;
  isDisease: Boolean;
  disease: Array<String> | Array<null>;
  medicine: Array<String> | Array<null>;
  medicineQuant: Array<String> | Array<null>;
  medicineTimes: Array<String> | Array<null>;
}

interface OldmanViewOutputTypes {
  id: String;
  name: String;
  age: Number;
  gender: String;
  avatar: String;
  isDisease: Boolean;
  disease: Array<String> | Array<null>;
  medicine: Array<{
    name: String | null;
    medicineQuant: String | null;
    medicineTimes: String | null;
  }>;
}

export function OldmanViewSingle(object: OldmanViewInputTypes | any): OldmanViewOutputTypes | {} {
  return object === [] ? {} : {
    id: object._id,
    name: object.name,
    age: object.age,
    gender: object.gender,
    avatar: object.avatar,
    isDisease: object.isDisease,
    disease: object.disease,
    medicine: reconstructionMedicine(object.medicine, object.medicineQuant, object.medicineTimes),
  }
};

export function OldmanViewMany(arrayObject: Array<OldmanViewInputTypes> | any): Array<OldmanViewOutputTypes> | any[] {
  return arrayObject === [] ? [] : arrayObject.map((item: OldmanViewInputTypes) => {
    return OldmanViewSingle(item);
  })
};

function reconstructionMedicine(name: Array<String | null>, quant: Array<String | null>, time: Array<String | null>) {
  if (!name) return [];
  const med = name.map((i, index) => {
    return {
      name: name[index],
      medicineQuant: time[index],
      medicineTimes: quant[index]
    }
  });
  return med;
}