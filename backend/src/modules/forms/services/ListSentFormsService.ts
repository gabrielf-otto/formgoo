import { injectable, inject } from 'tsyringe';

import Form from '../infra/typeorm/entities/Form';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   user_id: string;
}

@injectable()
class ListSentFormsService
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository
   )
   {}

   async run({ user_id }: IRequest): Promise<Form[]> 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'User not found'
         );
      }

      return await user.forms;
   }
}


export default ListSentFormsService;
