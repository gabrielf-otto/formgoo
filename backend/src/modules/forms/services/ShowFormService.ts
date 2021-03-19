import { injectable, inject } from 'tsyringe';

import Form from '../infra/typeorm/entities/Form';
import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   form_id: string;
   user_id: string;
}

@injectable()
class ShowFormService
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
            'Invalid JWT token'
         );
      }

      const form = await this.formRepository.findById(form_id);
      if (!form) 
      {
         throw new AppError(
            'Form not found'
         );
      }

      return form;
   }
}


export default ShowFormService;
