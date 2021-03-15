import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateResolutionService from '@modules/forms/services/CreateResolutionService';
import ShowResolutionService from '@modules/forms/services/ShowResolutionService';
import UpdateResolutionService from '@modules/forms/services/UpdateResolutionService';


class ResolutionController {
   static async store(request: Request, response: Response) 
   {
      const {
         delivered,
         answers
      } = request.body;

      const form_id = request.params.id;
      const user_id = request.user.id;

      const createResolution = container.resolve(CreateResolutionService);
      const resolution = await createResolution.run(
      {
         delivered,
         answers,
         form_id,
         user_id
      });

      return response.json(resolution);
   }

   static async show(request: Request, response: Response) 
   {
      const user_id = request.user.id;
      const form_id = request.params.id;

      const showResolution = container.resolve(ShowResolutionService);
      const resolution = await showResolution.run(
      {
         user_id,
         form_id
      });

      return response.json(resolution);
   }

   static async update(request: Request, response: Response) 
   {
      const { 
         delivered, 
         answers 
      } = request.body;

      const form_id = request.params.id;
      const user_id = request.user.id;

      const updateResolution = container.resolve(UpdateResolutionService);
      const resolution = await updateResolution.run(
      {
         delivered,
         answers,
         user_id,
         form_id
      });

      return response.json(resolution);
   }

   static async delete(request: Request, response: Response) {

   }
}


export default ResolutionController;
