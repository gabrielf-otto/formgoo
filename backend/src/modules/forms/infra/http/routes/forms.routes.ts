import { Router } from 'express';

import FormController from '../controllers/FormController';
import MyFormController from '../controllers/MyFormController';

import SendFormController from '../controllers/SendFormController';
import SentFormController from '../controllers/SentFormController';

import ResolutionController from '../controllers/ResolutionController';

import auth from '@modules/users/infra/middlewares/auth';


const formsRouter = Router();


formsRouter.post('/forms', auth, FormController.store);
formsRouter.put('/forms/:id', auth, FormController.update);
formsRouter.get('/forms/me', auth, MyFormController.index);
formsRouter.get('/forms/me/:id', auth, FormController.show);
formsRouter.delete('/forms/:id', auth, FormController.delete);

formsRouter.post('/forms/:id/send', auth, SendFormController.store);
formsRouter.get('/forms/sent/me', auth, SentFormController.index);
formsRouter.get('/forms/sent/me/:id', auth, SentFormController.show);

formsRouter.post('/forms/:id/resolution', auth, ResolutionController.store);
formsRouter.get('/forms/:id/resolution', auth, ResolutionController.show);
formsRouter.put('/forms/:id/resolution', auth, ResolutionController.update);
formsRouter.delete('/forms/:id/resolution', auth, ResolutionController.delete);


export default formsRouter;
