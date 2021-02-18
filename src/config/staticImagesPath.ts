import {diskStorage} from 'multer';
import { join } from 'path';

export default {
  storage: diskStorage({
    destination: join(__dirname, '..', 'public'),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname.trim()}`;
      cb(null, fileName);
    },
  }),
}