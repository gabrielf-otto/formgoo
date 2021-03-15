import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SessionService from '@modules/users/services/SessionService';


class SessionController {
   static async store(request: Request, response: Response) 
   {
      const session = container.resolve(SessionService);
      const { email, password } = request.body;
      
      const { user, token } = await session.run({
         email,
         password
      });

      return response.json({ 
         user,
         token 
      });
   }
}


export default SessionController;
