import { injectable, inject } from 'tsyringe';

import Resolution from '../infra/typeorm/entities/Resolution';
import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IResolutionRepository from '../repositories/IResolutionRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   form_id: string;
   user_id: string;
}

@injectable()
class ListResolutionsService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository,

      @inject('ResolutionProvider')
      private resolutionRepository: IResolutionRepository
   )
   {}

   async run({ user_id, form_id }: IRequest): Promise<Resolution[]> 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'Invalid JWT token'
         );
      }

      const form = await this.formRepository.findById(form_id);
      if (!form) 
      {
         throw new AppError(
            'Form no found'
         );
      }

      return await this.resolutionRepository.findFormResolutions(form_id);
   }
}


export default ListResolutionsService;
