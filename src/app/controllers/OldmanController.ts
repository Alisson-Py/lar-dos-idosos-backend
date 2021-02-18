import {Request as Req,Response as Res} from 'express';
import Oldman from '../models/OldmanModels';
import {OldmanViewMany, OldmanViewSingle} from '../View/OldmanView';
import dotenv from 'dotenv';

export default class OldmanControllers {
  async Index(req: Req, res: Res): Promise<Res<any>> {
    const data = await Oldman.find();
    return res.json(OldmanViewMany(data));
  };

  async Show(req: Req, res: Res): Promise<Res<any>> {
    const id = req.params.id;
    const data = await Oldman.findOne({_id: id});
    if (!data) return res.status(404).json({err: 'oldman not found'})
    return res.json(OldmanViewSingle(data));
  };

  async Store(req: Req, res: Res): Promise<Res<any>> {
    dotenv.config();
    const {
      name,
      age,
      gender,
      isDisease,
      disease,
      medicine,
      medicineQuant,
      medicineTimes
    } = req.body;

    const requestImages = req.file as Express.Multer.File;
    
    await Oldman.create({
      name,
      age,
      gender,
      isDisease: isDisease,
      disease: disease? JSON.parse(disease): null,
      medicine: medicine? JSON.parse(medicine): null,
      medicineQuant: medicineQuant? JSON.parse(medicineQuant): null,
      medicineTimes: medicineTimes? JSON.parse(medicineTimes): null,
      avatar: requestImages.filename
    })

    return res.status(202).send();
  }
}