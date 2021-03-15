import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFormRepository from '../repositories/IFormRepository';
import IResolutionRepository from '../repositories/IResolutionRepository';
import IAnswerDTO from '../dtos/IAnswerDTO';

import AppError from '@shared/errors/AppError';


interface IRequest {
   delivered: boolean;
   answers: IAnswerDTO[];
   form_id: string;
   user_id: string;
}

@injectable()
class CreateResolutionService 
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

   async run({ delivered, answers, form_id, user_id }: IRequest) 
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

      if (form.user_id === user_id) 
      {
         throw new AppError(
            'You cannot create resolutions to your own forms'
         );
      }

      // load user received forms
      const forms = await user.forms;

      const userForm = forms.find(form => form.id === form_id);
      if (!userForm) 
      {
         throw new AppError(
            'You didn\'t receive this form',
            401
         );
      }

      const resolution = await this.resolutionRepository.findMyResolution({
         user_id: user.id,
         form_id: form.id
      });

      if (resolution) 
      {
         throw new AppError(
            'Already exists a resolution for this form'
         );
      }

      return await this.resolutionRepository.store({
         delivered,
         answers,
         form_id,
         user_id
      });
   }
}


export default CreateResolutionService;
