import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IResolutionRepository from '../repositories/IResolutionRepository';
import IFormRepository from '../repositories/IFormRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   resolution_id: string;
   user_id: string;
}

@injectable()
class DeleteResolutionService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('ResolutionRepository')
      private resolutionRepository: IResolutionRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ resolution_id, user_id }: IRequest) 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'Invalid JWT token'
         );
      }

      const resolution = await this.resolutionRepository.findById(resolution_id);
      if (!resolution) 
      {
         throw new AppError(
            'Resolution not found'
         );
      }

      const form = await this.formRepository.findById(resolution.form_id);
      if (form?.user_id !== user_id)
      {
         throw new AppError(
            'Permission denied',
            401
         );
      }

      await this.resolutionRepository.deleteById(resolution_id);
   }
}


export default DeleteResolutionService;
