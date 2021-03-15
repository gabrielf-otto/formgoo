import { injectable, inject } from 'tsyringe';

import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';


interface IRequest {
   form_id: string;
   user_id: string;
}

@injectable()
class ShowResolutionService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ form_id, user_id }: IRequest): Promise<Form | undefined> 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'User not found'
         );
      }

      return await this.formRepository.findMyForm({ form_id, user_id });
   }
}


export default ShowResolutionService;
