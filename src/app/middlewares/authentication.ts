import { Request as Req, Response as Res, NextFunction as Next } from "express";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();

export default (req: Req, res: Res, next: Next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({err: 'auth not found'});
  
  const [baerer, token] = auth.split(' ');
  if (!token) return res.status(401).json({err: 'token not found'});

  jwt.verify(token, process.env.SECRET || 'secret string', (err, decode: any) =>{ 
    if(err) return res.status(401).json({err: 'token invalid'});
    req.body.auth = {
      id: decode.id,
      userLevel: decode.userLevel
    }
  });
  next();
};