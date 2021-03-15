import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFormRepository from '../repositories/fakes/FakeFormRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';
import SendFormService from './SendFormService';


let userRepository: FakeUserRepository;
let formRepository: FakeFormRepository;

let sendForm: SendFormService;

let user: User;
let form: Form;


describe('CreateResolution', () => 
{
   beforeEach(async () => 
   {
      userRepository = new FakeUserRepository();
      formRepository = new FakeFormRepository();

      sendForm = new SendFormService(
         userRepository,
         formRepository
      );

      user = await userRepository.store({
         email: 'gabriel@mail.com',
         password: 'pass'
      });

      user.forms = [];

      form = await formRepository.store({
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
         user_id: user.id
      });
   });

   it('should not find the user', async () => 
   {
      await expect(sendForm.run({
         email: 'pedro@mail.com',
         form_id: form.id,
         user_id: '#'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not find the form', async () => 
   {
     await expect(sendForm.run({
         email: 'pedro@mail.com',
         form_id: '#',
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not send a form to yourself', async () => 
   {     
      await expect(sendForm.run({
         email: 'gabriel@mail.com',
         form_id: form.id,
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not find a invited user', async () => 
   {
      await expect(sendForm.run({
         email: 'pedro@mail.com',
         form_id: form.id,
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should send a form to an user', async () => 
   {
      const pedro = await userRepository.store({
         email: 'pedro@mail.com',
         password: 'pass'
      });

      await sendForm.run({
         email: 'pedro@mail.com',
         form_id: '1',
         user_id: user.id
      });

      expect(pedro.forms.length).toBe(1);
   });
});
