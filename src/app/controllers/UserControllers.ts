import {Request as Req,Response as Res} from 'express';
import User from '../models/UserModels';
import crypto from 'crypto';

export default class UserControllers {
  async Login(req: Req,res: Res): Promise<Res<any>> {
    const credential = req.headers.authorization;
    if (!credential) return res.status(401).json({err: 'Data not recieve'})
    const [basic, contentHash] = credential.split(' ');
    const [email, password] = Buffer.from(contentHash, 'base64')
      .toString()
      .split(':')
    ;

    try {
      const user = await User.findOne({email});
      if (!user) return res.status(404).json({
        err: 'Email not found'
      })
      const pswHash = crypto.createHash('md5').update(password).digest('base64');
      if (pswHash !== user.passwordWash) return res.status(401).json({
        err: 'Incorrect Password',
      })
      return res.status(200).json({
        id: user._id,
        name: user.name,
      })
    } catch (error) {
      return res.status(500).send();
    }
  };
  async Create(req: Req,res: Res): Promise<Res<any>> {
    const {name, email, password} = req.body;
    try {
      const pswHash = crypto.createHash('md5').update(password).digest('base64');
      await User.create({
        name,
        email,
        passwordWash: pswHash
      })
      return res.status(200).json({created: true})
    }catch(err) {
      return res.status(500).send();
    }
  }
}