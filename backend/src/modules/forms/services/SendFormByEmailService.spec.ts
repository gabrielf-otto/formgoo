import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFormRepository from '../repositories/fakes/FakeFormRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';
import SendFormService from './SendFormByEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';


let userRepository: FakeUserRepository;
let formRepository: FakeFormRepository;
let mailProvider: FakeMailProvider;

let sendForm: SendFormService;

let user: User;
let form: Form;


describe('CreateResolution', () => 
{
   beforeEach(async () => 
   {
      userRepository = new FakeUserRepository();
      formRepository = new FakeFormRepository();
      mailProvider = new FakeMailProvider();

      sendForm = new SendFormService(
         userRepository,
         formRepository,
         mailProvider
      );

      user = await userRepository.store({
         email: 'gabriel@mail.com',
         password: 'pass'
      });

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
         to: 'pedro@mail.com',
         form_id: form.id,
         user_id: '#'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not find the form', async () => 
   {
     await expect(sendForm.run({
         to: 'pedro@mail.com',
         form_id: '#',
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not send a form to yourself', async () => 
   {     
      await expect(sendForm.run({
         to: 'gabriel@mail.com',
         form_id: form.id,
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should send a form to an user', async () => 
   {
      const sent = await sendForm.run({
         to: 'pedro@mail.com',
         form_id: '1',
         user_id: user.id
      });

      expect(sent).toBe(true);
   });
});
