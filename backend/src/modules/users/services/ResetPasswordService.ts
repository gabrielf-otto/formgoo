import { injectable, inject } from 'tsyringe';
import { isAfter, addMinutes } from 'date-fns';

import IUserRepository from '../repositories/IUserRepository';
import ITokenRepository from '../repositories/ITokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';


interface IRequest {
   token: string;
   password: string;
   confirm: string;
}

@injectable()
class ResetPasswordService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('TokenRepository')
      private tokenRepository: ITokenRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider
   )
   {}
   
   async run({ token, password, confirm }: IRequest): Promise<void> 
   {
      const userToken = await this.tokenRepository.findByValue(token);
      if (!userToken) 
      {
         throw new AppError(
            'Invalid token',
            401
         );
      }

      const user = await this.userRepository.findById(userToken.user_id);
      if (!user) 
      {
         throw new AppError(
            'User not found'
         );
      }

      const compare = addMinutes(userToken.created_at, 30);
      if (isAfter(Date.now(), compare)) 
      {
         throw new AppError(
            'Token expired',
            401
         );
      }

      user.password = await this.hashProvider.generate(password);
      await this.userRepository.save(user);
      await this.tokenRepository.deleteById(userToken.id);
   }
}


export default ResetPasswordService;
