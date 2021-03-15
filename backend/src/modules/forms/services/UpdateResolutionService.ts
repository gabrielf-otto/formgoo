import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFormRepository from '../repositories/IFormRepository';
import IResolutionRepository from '../repositories/IResolutionRepository';
import IAnswerDTO from '../dtos/IAnswerDTO';

import AppError from '@shared/errors/AppError';


interface IRequest {
   delivered: boolean;
   answers: IAnswerDTO[];
   user_id: string;
   form_id: string;
}

@injectable()
class UpdateResolutionService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository,

      @inject('ResolutionRepository')
      private resolutionRepository: IResolutionRepository
   )
   {}

   async run({ delivered, answers, user_id, form_id }: IRequest) 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'User not found'
         );
      }

      const form = await this.formRepository.findById(form_id);
      if (!form) 
      {
         throw new AppError(
            'Form not found'
         );
      }

      const resolution = await this.resolutionRepository.findMyResolution({ 
         form_id, 
         user_id 
      });

      if (!resolution) 
      {
         throw new AppError(
            'You have no resolution for this form'
         );
      }

      const updatedResolution = await this.resolutionRepository.merge(resolution, {
         delivered,
         answers
      });

      return await this.resolutionRepository.save(updatedResolution);
   }
}


export default UpdateResolutionService;
