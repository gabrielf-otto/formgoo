import { injectable, inject } from 'tsyringe';

import Form from '../infra/typeorm/entities/Form';
import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   user_id: string;
}

@injectable()
class ListFormsService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ user_id }: IRequest): Promise<Form[]> 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'Invalid JWT token'
         );
      }

      return await this.formRepository.findMyForms(user_id);
   }
}


export default ListFormsService;
