import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendFormService from '@modules/forms/services/SendFormService';


class SendFormController {
   static async store(request: Request, response: Response) 
   {
      const { email } = request.body;
      const form_id = request.params.id;

      const sendForm = container.resolve(SendFormService);
      await sendForm.run({
         email,
         form_id,
         user_id: request.user.id
      });

      return response.send();
   }
}


export default SendFormController;
