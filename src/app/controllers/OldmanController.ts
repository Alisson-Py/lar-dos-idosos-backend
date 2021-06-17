import {Request as Req,Response as Res} from 'express';
import Oldman from '../models/OldmanModels';
import {OldmanViewMany, OldmanViewSingle} from '../View/OldmanView';
import { v4 as uuid } from 'uuid';

export default class OldmanControllers {
  async Index(req: Req, res: Res): Promise<Res<any>> {
    try {
      const data = await Oldman.find({
        deleted: false
      });

      if (!data) return res.json([]);
      return res.json(OldmanViewMany(data));
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    };
  };

  async Show(req: Req, res: Res): Promise<Res<any>> {
    const id = req.params.id;
    try {
      const data = await Oldman.findOne({
        id,
        deleted: false
      });

      if (!data) return res.status(400).json({err: 'oldman not found'});
      return res.json(OldmanViewSingle(data));
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    };
  };

  async Store(req: Req, res: Res): Promise<Res<any>> {
    const {
      name, age, gender,
      cpf, rg, isDisease,
      disease, medicineName,
      medicineQuant, medicineTimes,
      image
    } = req.body;
    try {
      await Oldman.create({
        id: uuid(),
        name,
        age,
        cpf,
        rg,
        gender,
        isDisease: isDisease,
        disease: disease || null,
        medicine: {
          name: medicineName,
          quant: medicineQuant,
          times: medicineTimes
        },
        // avatar: image
      });

      return res.json({created: true});
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    };
  };
  
  async Update(req: Req, res: Res): Promise<Res<any>> {
    const id = req.params.id;
    try {
      return res.json({update: id});
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    };
  };

  async Delete(req: Req, res: Res): Promise<Res<any>> {
    const id = req.params.id;
    try {
      await Oldman.updateOne({
        id
      },{
        deleted: true
      })

      return res.json({delete: id});
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    };
  };
};