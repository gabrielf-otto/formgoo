import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';


class UserController {
   static async index(request: Request, response: Response) {
      return response.json();
   }

   static async store(request: Request, response: Response) 
   {
      const { 
         email, 
         password 
      } = request.body;

      const createUser = container.resolve(CreateUserService);
      const user = await createUser.run({ 
         email, 
         password 
      });

      return response.json(classToClass(user));
   }
}


export default UserController;
