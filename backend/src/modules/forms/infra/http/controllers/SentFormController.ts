import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSentFormsService from '@modules/forms/services/ListSentFormsService';
import ShowSentFormService from '@modules/forms/services/ShowSentFormService';


class SentFormController {
   static async index(request: Request, response: Response) 
   {
      const listSentForms = container.resolve(ListSentFormsService);
      const forms = await listSentForms.run({
         user_id: request.user.id
      });

      return response.json(forms);
   }

   static async show(request: Request, response: Response) 
   {
      const user_id = request.user.id;
      const form_id = request.params.id;

      const showSentForm = container.resolve(ShowSentFormService);
      const form = await showSentForm.run(
      {
         form_id,
         user_id
      });

      return response.json(form);
   }
}


export default SentFormController;
