import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFormService from '@modules/forms/services/CreateFormService';
import UpdateFormService from '@modules/forms/services/UpdateFormService';
import ListFormsService from '@modules/forms/services/ListFormsService';

import ShowFormService from '@modules/forms/services/ShowFormService';
import DeleteFormService from '@modules/forms/services/DeleteFormService';


class FormController {
   static async index(request: Request, response: Response) 
   {
      const listForms = container.resolve(ListFormsService);
      const forms = await listForms.run({
         user_id: request.user.id
      });

      return response.json(forms);
   }

   static async show(request: Request, response: Response) 
   {
      const user_id = request.user.id;
      const { form_id } = request.params;

      const showForm = container.resolve(ShowFormService);
      const form = await showForm.run(
      {
         form_id,
         user_id
      });

      return response.json(form);
   }

   static async store(request: Request, response: Response) 
   {
      const {
         title,
         description,
         questions
      } = request.body;

      const user_id = request.user.id;

      const createForm = container.resolve(CreateFormService);
      const form = await createForm.run(
      {
         title,
         description,
         questions,
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
      const { form_id } = request.params;

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

   static async delete(request: Request, response: Response) 
   {
      const user_id = request.user.id;
      const { form_id } = request.params;

      const deleteForm = container.resolve(DeleteFormService);
      await deleteForm.run({
         form_id,
         user_id
      });
   }
}


export default FormController;
