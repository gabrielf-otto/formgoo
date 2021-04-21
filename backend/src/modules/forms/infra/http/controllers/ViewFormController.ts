import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ViewFormService from '@modules/forms/services/ViewFormService';


class ViewFormController {
   static async show(request: Request, response: Response) 
   {
      const { form_id } = request.params;

      const viewForm = container.resolve(ViewFormService);
      const form = await viewForm.run({
         form_id
      });

      return response.json(form);
   }
}


export default ViewFormController;
