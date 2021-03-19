import { injectable, inject } from 'tsyringe';
import path from 'path';

import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';


interface IRequest {
   to: string;
   form_id: string;
   user_id: string;
}

@injectable()
class SendFormByEmailService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider
   )
   {}

   async run({ to, form_id, user_id }: IRequest): Promise<boolean> 
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

      if (user.email === to) 
      {
         throw new AppError(
            'You can\'t send your forms to yourself'
         );
      }

      await this.mailProvider.sendMail({
         to: {
            email: to,
            name: ''
         },
         from: {
            email: user.email,
            name: '' // user.name
         },
         subject: 'Te convido para responder um formulário',
         template: 
         {
            file: path.resolve(__dirname, '..', 'views', 'form_invite.hbs'),
            variables: {
               link: ''
            }
         }
      });

      return true;
   }
}


export default SendFormByEmailService;
