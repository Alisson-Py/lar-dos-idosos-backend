import {Request as Req,Response as Res} from 'express';
import Oldman from '../models/OldmanModels';
import UserModels from '../models/UserModels';

export default class AdminControllers {
  async Users(req: Req, res: Res): Promise<Res<any>> {
    return res.json(
      await Oldman.find()
    )
  };
  async Delete(req: Req, res: Res): Promise<Res<any>> {
    await Oldman.deleteMany();
    await UserModels.deleteMany();
    return res.json({delete: true})
  } 
}