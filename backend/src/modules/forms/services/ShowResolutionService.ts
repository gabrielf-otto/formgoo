import { injectable, inject } from 'tsyringe';

import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IResolutionRepository from '@modules/forms/repositories/IResolutionRepository';
import Resolution from '../infra/typeorm/entities/Resolution';

import AppError from '@shared/errors/AppError';


interface IRequest {
   user_id: string;
   form_id: string;
}

@injectable()
class ShowResolutionService
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

   async run({ user_id, form_id }: IRequest): Promise<Resolution | undefined> 
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

      return await this.resolutionRepository.findMyResolution({ 
         user_id, 
         form_id 
      });
   }
}


export default ShowResolutionService;
