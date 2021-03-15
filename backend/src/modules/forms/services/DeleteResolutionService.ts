import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IResolutionRepository from '../repositories/IResolutionRepository';

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
      private resolutionRepository: IResolutionRepository
   )
   {}

   async run({ resolution_id, user_id }: IRequest) 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'User not found'
         );
      }

      const resolution = await this.resolutionRepository.findById(resolution_id);
      if (!resolution) 
      {
         throw new AppError(
            'Resolution not found'
         );
      }

      if (resolution.user_id !== user_id)
      {
         throw new AppError(
            'Permission denied',
            401
         );
      }

      await this.resolutionRepository.delete(resolution_id);
   }
}


export default DeleteResolutionService;
