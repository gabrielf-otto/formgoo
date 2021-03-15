import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMyFormsService from '@modules/forms/services/ListMyFormsService';


class MyFormController {
   static async index(request: Request, response: Response) 
   {
      const listMyForms = container.resolve(ListMyFormsService);
      const forms = await listMyForms.run({
         user_id: request.user.id
      });

      return response.json(forms);
   }
}


export default MyFormController;
