import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendFormService from '@modules/forms/services/SendFormByEmailService';


class SendFormController {
   static async store(request: Request, response: Response) 
   {
      const { to } = request.body;
      const { form_id } = request.params;

      const sendForm = container.resolve(SendFormService);
      await sendForm.run({
         to,
         form_id,
         user_id: request.user.id
      });

      return response.send();
   }
}


export default SendFormController;
