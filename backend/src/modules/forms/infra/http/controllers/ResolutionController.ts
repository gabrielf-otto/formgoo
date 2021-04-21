import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateResolutionService from '@modules/forms/services/CreateResolutionService';
import ListResolutionsService from '@modules/forms/services/ListResolutionsService';
import ShowResolutionService from '@modules/forms/services/ShowResolutionService';
import DeleteResolutionService from '@modules/forms/services/DeleteResolutionService';


class ResolutionController {
   static async index(request: Request, response: Response) 
   {
      const { form_id } = request.params;
      const user_id = request.user.id;

      const listResolutions = container.resolve(ListResolutionsService);
      const resolutions = await listResolutions.run({
         form_id,
         user_id
      });

      return response.json(resolutions);
   }

   static async show(request: Request, response: Response) 
   {
      const { resolution_id } = request.params;
      const user_id = request.user.id;

      const showResolution = container.resolve(ShowResolutionService);
      const resolution = await showResolution.run(
      {
         resolution_id,
         user_id
      });

      return response.json(resolution);
   }

   static async store(request: Request, response: Response) 
   {
      const {
         answers,
         from
      } = request.body;

      const { form_id } = request.params;

      const createResolution = container.resolve(CreateResolutionService);
      const resolution = await createResolution.run(
      {
         answers,
         from,
         form_id
      });

      return response.json(resolution);
   }

   static async delete(request: Request, response: Response) 
   {
      const { resolution_id } = request.params;
      const user_id = request.user.id;

      const deleteResolution = container.resolve(DeleteResolutionService);
      await deleteResolution.run({
         resolution_id,
         user_id
      });
   }
}


export default ResolutionController;
