import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

interface TokenParam {
  id: string;
  userLevel: string;
}

export default (param: TokenParam): string => {
  return jwt.sign(param, process.env.SECRET || 'secret string', {
    expiresIn: '4h'
  });
};