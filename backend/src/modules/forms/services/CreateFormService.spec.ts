import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFormRepository from '../repositories/fakes/FakeFormRepository';
import CreateFormService from './CreateFormService';

import User from '@modules/users/infra/typeorm/entities/User';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';


let formRepository: FakeFormRepository;
let userRepository: FakeUserRepository;

let createForm: CreateFormService;

let user: User;

describe('CreateResolution', () => 
{
   beforeEach(async () => 
   {
      userRepository = new FakeUserRepository();
      formRepository = new FakeFormRepository();

      createForm = new CreateFormService(
         userRepository,
         formRepository
      );

      user = await userRepository.store({
         email: 'gabriel@mail.com',
         password: 'pass'
      });
   });

   it('should not find the user', async () => 
   {
      await expect(createForm.run({
         title: 'Formulário',
         questions: [
            {
               type: '',
               content: '',
               position: 1,
               required: true,
               form_id: '1'
            }
         ],
         user_id: '#'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should create a new form', async () => 
   {
      const form = await createForm.run({
         title: '',
         questions: [
            {
               type: '',
               content: '',
               position: 1,
               required: true,
               options: [],
               form_id: '1'
            }
         ],
         user_id: user.id
      });

      expect(form).toBeInstanceOf(Form);
   });
});
