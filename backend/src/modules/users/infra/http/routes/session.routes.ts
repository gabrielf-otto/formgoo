import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionController';


const sessionsRouter = Router();


sessionsRouter.post('/session', SessionsController.store);


export default sessionsRouter;
