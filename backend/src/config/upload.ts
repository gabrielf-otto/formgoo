import path from 'path';
import multer from 'multer';
import crypto from 'crypto';


const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
   tmpFolder,
   uploadsFolder: path.resolve(tmpFolder, 'uploads'),

   storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
         const hash = crypto.randomBytes(10).toString('hex');
         const name = `${hash}-${file.originalname}`;

         return callback(null, name);
      }
   })
}
