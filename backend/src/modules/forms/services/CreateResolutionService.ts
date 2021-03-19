import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFormRepository from '../repositories/IFormRepository';
import IResolutionRepository from '../repositories/IResolutionRepository';
import IAnswerDTO from '../dtos/IAnswerDTO';

import AppError from '@shared/errors/AppError';


interface IRequest {
   answers: IAnswerDTO[];
   from: string;
   form_id: string;
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

   async run({ answers, from, form_id }: IRequest) 
   {
      const form = await this.formRepository.findById(form_id);
      if (!form) 
      {
         throw new AppError(
            'Form not found'
         );
      }

      const user = await this.userRepository.findById(form.user_id);
      if (user?.email === from) 
      {
         throw new AppError(
            'You cannot create resolutions to your own forms'
         );
      }

      return await this.resolutionRepository.store({
         answers,
         from,
         form_id
      });
   }
}


export default CreateResolutionService;
