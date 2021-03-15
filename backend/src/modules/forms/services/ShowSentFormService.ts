import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFormRepository from '../repositories/IFormRepository';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';


interface IRequest {
   user_id: string;
   form_id: string;
}

@injectable()
class ShowSentFormService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ user_id, form_id }: IRequest): Promise<Form | undefined> 
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

      // load user received forms
      const forms = await user.forms;

      const userForm = forms.find(form => form.id === form_id);
      if (!userForm) 
      {
         throw new AppError(
            'You didn\'t receive this form',
            401
         );
      }

      return form;
   }
}


export default ShowSentFormService;
