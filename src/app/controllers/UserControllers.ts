import {Request as Req,Response as Res} from 'express';
import User from '../models/UserModels';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import tokenGen from '../auth/tokenGen';

export default class UserControllers {
  async Login(req: Req,res: Res): Promise<Res<any>> {
    const credential = req.headers.authorization;

    try {
      if (!credential) return res.status(401).json({err: 'Data not recieve'});

      const [, contentHash] = credential.split(' ');
      const [email, password] = Buffer.from(contentHash, 'base64').toString().split(':');

      const user = await User.findOne({email});
      if (!user) return res.status(404).json({
        err: 'Email not found'
      });

      if (!await bcrypt.compare(password, user.passwordWash)) return res.status(401).json({err: 'Incorrect Password'});

      return res.json({
        id: user.id,
        fistName: user.firstName,
        lastName: user.lastName,
        userLevel: user.userLevel,
        token: tokenGen({
          id: user.id,
          userLevel: user.userLevel
        })
      });
    } catch (err) {
      console.log({log: err.message});
      return res.status(500).send();
    }
  };

  async Index(req: Req,res: Res): Promise<Res<any>> {
    try {
      const users  = await User.find({
        deleted: false
      });
      if (!users) return res.json(['not found']);
      return res.json(users);
    }catch(err) {
      console.log({log: err.message});
      return res.status(500);
    };
  };

  async Show(req: Req,res: Res): Promise<Res<any>> {
    const id = req.params.id;
    try {
      const user = await User.findOne({
        id,
        deleted: false
      });
      if (!user) return res.status(401).json({err: 'user not found'});
      return res.json(user);
    }catch(err) {
      console.log({log: err.message});
      return res.status(500);
    };
  };
  
  async Store(req: Req,res: Res): Promise<Res<any>> {
    const {
      firstName,
      lastName,
      email,
      password,
      userLevel,
      auth
    } = req.body;
    try {
      if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin')) return res.status(401).json({err: 'access denied'})
      await User.create({
        id: uuid(),
        firstName,
        lastName,
        email,
        passwordWash: await bcrypt.hash(password, await bcrypt.genSalt(10)),
        userLevel
      });

      return res.json({created: true})
    }catch(err) {
      console.log({log: err.message});
      return res.status(500);
    };
  };

  async Update(req: Req,res: Res): Promise<Res<any>> {
    const {auth} = req.body;
    try {
      if (!(auth.userLevel === 'owner' || auth.userLevel === 'admin')) return res.status(401).json({err: 'access denied'})
      return res.json({show: true})
    }catch(err) {
      console.log({log: err.message});
      return res.status(500);
    };
  };

  async Delete(req: Req,res: Res): Promise<Res<any>> {
    const id = req.params.id;
    const {auth} = req.body;
    try {
      if (!(auth.userLevel === 'owner')) return res.status(401).json({err: 'access denied'})
      const user = await User.findOne({
        id,
        deleted: false
      });
      if (!user) return res.status(400).json({err: 'user not found'});
      
      await User.updateOne({
        id,
        deleted: false
      },{
        deleted: true
      });
      return res.json({show: true})
    }catch(err) {
      console.log({log: err.message});
      return res.status(500);
    };
  };
}