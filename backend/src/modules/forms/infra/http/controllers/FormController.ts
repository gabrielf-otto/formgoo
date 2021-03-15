import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormService from '@modules/forms/services/CreateFormService';
import UpdateFormService from '@modules/forms/services/UpdateFormService';
import ShowFormService from '@modules/forms/services/ShowFormService';


class FormController {
   static async store(request: Request, response: Response) 
   {
      const {
         title,
         description,
         questions
      } = request.body;

      const createForm = container.resolve(CreateFormService);
      const form = await createForm.run(
      {
         title,
         description,
         questions,
         user_id: request.user.id
      });

      return response.json(form);
   }

   static async show(request: Request, response: Response) 
   {
      const user_id = request.user.id;
      const form_id = request.params.id;

      const showForm = container.resolve(ShowFormService);
      const form = await showForm.run(
      {
         form_id,
         user_id
      });

      return response.json(form);
   }

   static async update(request: Request, response: Response) 
   {
      const { 
         title, 
         description, 
         questions 
      } = request.body;

      const user_id = request.user.id;
      const form_id = request.params.id;

      const updateForm = container.resolve(UpdateFormService);
      const form = await updateForm.run(
      {
         title,
         description,
         questions,
         form_id,
         user_id
      });

      return response.json(form);
   }

   static async delete(request: Request, response: Response) {

   }
}


export default FormController;
