import { Router } from 'express';


import FormController from '../controllers/FormController';
import SendFormController from '../controllers/SendFormController';
import ViewFormController from '../controllers/ViewFormController';
import ResolutionController from '../controllers/ResolutionController';

import auth from '@modules/users/infra/middlewares/auth';


const formsRouter = Router();


formsRouter.post('/forms', auth, FormController.store);
formsRouter.put('/forms/:form_id', auth, FormController.update);
formsRouter.get('/forms', auth, FormController.index);
formsRouter.get('/forms/:form_id', auth, FormController.show);
formsRouter.delete('/forms/:form_id', auth, FormController.delete);

formsRouter.post('/forms/:form_id/send', auth, SendFormController.store);
formsRouter.get('/forms/:form_id/view', ViewFormController.show);

formsRouter.post('/forms/:form_id/resolutions', ResolutionController.store);
formsRouter.get('/forms/:form_id/resolutions', auth, ResolutionController.index);
// formsRouter.put('/forms/:form_id/resolutions', auth, ResolutionController.update);
formsRouter.get('/resolutions/:resolution_id', auth, ResolutionController.show);
formsRouter.delete('/resolutions/:resolution_id', auth, ResolutionController.delete);


export default formsRouter;
