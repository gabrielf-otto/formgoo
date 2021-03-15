import { injectable, inject } from 'tsyringe';

import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   email: string;
   form_id: string;
   user_id: string;
}

@injectable()
class SendFormService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ email, form_id, user_id }: IRequest): Promise<void> 
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

      if (user.email === email) 
      {
         throw new AppError(
            'You can\'t send your forms to yourself'
         );
      }

      const invitedUser = await this.userRepository.findByEmail(email);
      if (!invitedUser) 
      {
         throw new AppError(
            'User not found'
         );
      }

      const forms = await invitedUser.forms;
      forms.push(form);

      // invited.forms = [form]; - for test

      await this.userRepository.save(invitedUser);
   }
}


export default SendFormService;
