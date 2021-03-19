import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFormRepository from '../repositories/IFormRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   form_id: string;
   user_id: string;
}

@injectable()
class DeleteFormService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ form_id, user_id }: IRequest) 
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

      if (form.user_id !== user_id)
      {
         throw new AppError(
            'Permission denied',
            401
         );
      }

      await this.formRepository.deleteById(form_id);
   }
}


export default DeleteFormService;
