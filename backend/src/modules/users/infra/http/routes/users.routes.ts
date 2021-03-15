import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import auth from '@modules/users/infra/middlewares/auth';

import UserController from '@modules/users/infra/http/controllers/UserController';


const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.get('/users', UserController.index);

usersRouter.post('/users', UserController.store);  


export default usersRouter;
