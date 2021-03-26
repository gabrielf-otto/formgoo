import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';


interface IRequest {
   name: string;
   email: string;
   password: string;
}

@injectable()
class CreateUserService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider
   ) 
   {}

   async run({ name, email, password }: IRequest): Promise<User> 
   {
      const user = await this.userRepository.findByEmail(email);
      if (user) 
      {
         throw new AppError(
            'E-mail address already exists'
         );
      }

      return this.userRepository.store({ 
         name,
         email, 
         password: await this.hashProvider.generate(password)
      });
   }

}


export default CreateUserService;
