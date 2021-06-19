import {Request as Req,Response as Res} from 'express';
import Oldman from '../models/OldmanModels';
import {OldmanViewMany, OldmanViewSingle} from '../view/OldmanView';
import { v4 as uuid } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

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
      image, auth
    } = req.body;
    try {
      let imageUrl:string = '';
      if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin')) return res.status(401).json({err: 'access denied'})
      await cloudinary.uploader.upload(image, {
        folder: 'lar-dos-idosos'
      }, (err, cb) => {
        if(err) throw err;
        if(!cb) return;
        imageUrl = cb.url
      });

      await Oldman.create({
        id: uuid(),
        name,
        age,
        cpf,
        rg,
        gender: gender.toUpperCase(),
        isDisease: isDisease,
        disease: disease || null,
        medicine: {
          name: medicineName,
          quant: medicineQuant,
          times: medicineTimes
        },
        avatar: imageUrl
      });

      return res.json({created: true});
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    };
  };
  
  async Update(req: Req, res: Res): Promise<Res<any>> {
    const id = req.params.id;
    const {auth} = req.body;
    try {
      if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin')) return res.status(401).json({err: 'access denied'})
      return res.json({update: id});
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    };
  };

  async Delete(req: Req, res: Res): Promise<Res<any>> {
    const id = req.params.id;
    const {auth} = req.body;
    try {
      if (!(auth.userLevel === 'owner')) return res.status(401).json({err: 'access denied'})

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