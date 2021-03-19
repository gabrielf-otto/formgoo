import { injectable, inject } from 'tsyringe';

import IQuestionDTO from '../dtos/IQuestionDTO';
import IFormRepository from '../repositories/IFormRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   title: string;
   description?: string;
   questions: IQuestionDTO[];
   user_id: string;
}

@injectable()
class CreateFormService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ title, description, questions, user_id }: IRequest) 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'Invalid JWT token'
         );
      }

      const form = await this.formRepository.store({
         title,
         description,
         questions,
         user_id
      });

      return form;
   }
}


export default CreateFormService;
