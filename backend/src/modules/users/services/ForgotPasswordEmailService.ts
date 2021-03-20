import { injectable, inject } from 'tsyringe';
import { addMinutes, isBefore } from 'date-fns';

import path from 'path';

import IUserRepository from '../repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ITokenRepository from '@modules/users/repositories/ITokenRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   email: string;
}

@injectable()
class ForgotPasswordEmailService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('TokenRepository')
      private tokenRepository: ITokenRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider
   )
   {}
   
   async run({ email }: IRequest): Promise<void> 
   {
      const user = await this.userRepository.findByEmail(email);
      if (!user) 
      {
         throw new AppError(
            'Invalid e-mail'
         );
      }

      const userToken = await this.tokenRepository.findByUserId(user.id);
      if (userToken) 
      {
         const compare = addMinutes(userToken.created_at, 30);
         if (isBefore(Date.now(), compare)) 
         {
            throw new AppError(
               'An email has already been sent',
               401
            );
         }
      }

      const { value } = await this.tokenRepository.generateTo(user.id);
      await this.mailProvider.sendMail({
         to: {
            name: user.name,
            email: user.email
         },
         subject: '[Formspy] Recuperação de senha',
         template: 
         {
            file: path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'),
            variables: 
            {
               name: user.name,
               link: `${process.env.APP_WEB_URL}/password/reset?token=${value}`
            }
         }
      });
   }
}


export default ForgotPasswordEmailService;
