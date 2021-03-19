import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IResolutionRepository from '@modules/forms/repositories/IResolutionRepository';
import Resolution from '../infra/typeorm/entities/Resolution';

import AppError from '@shared/errors/AppError';


interface IRequest {
   resolution_id: string;
   user_id: string;
}

@injectable()
class ShowResolutionService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('ResolutionRepository')
      private resolutionRepository: IResolutionRepository
   )
   {}

   async run({ resolution_id, user_id }: IRequest): Promise<Resolution | undefined> 
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

      return resolution;
   }
}


export default ShowResolutionService;
