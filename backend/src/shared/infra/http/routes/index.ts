import { Router } from 'express';

import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import formsRouter from '@modules/forms/infra/http/routes/forms.routes';



const routes = Router();

routes.use(sessionRouter);
routes.use(usersRouter);
routes.use(formsRouter);



export default routes;
