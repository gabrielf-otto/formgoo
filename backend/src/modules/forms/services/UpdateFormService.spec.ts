import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFormRepository from '../repositories/fakes/FakeFormRepository';
import FakeResolutionRepository from '../repositories/fakes/FakeResolutionRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';
import UpdateFormService from './UpdateFormService';


let formRepository: FakeFormRepository;
let resolutionRepository: FakeResolutionRepository;
let userRepository: FakeUserRepository;

let updateForm: UpdateFormService;

let user: User;
let form: Form;


describe('CreateResolution', () => 
{
   beforeEach(async () => 
   {
      userRepository = new FakeUserRepository();
      formRepository = new FakeFormRepository();
      resolutionRepository = new FakeResolutionRepository();

      updateForm = new UpdateFormService(
         userRepository,
         formRepository,
         resolutionRepository
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
      await expect(updateForm.run({
         title: '',
         questions: [
            {
               type: '',
               content: '',
               form_id: form.id,
               position: 1,
               required: false
            }
         ],
         user_id: '#',
         form_id: form.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not find the form', async () => 
   {
      await expect(updateForm.run({
         title: '',
         questions: [
            {
               type: '',
               content: '',
               form_id: form.id,
               position: 1,
               required: false
            }
         ],
         form_id: '#',
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not update the form \'cause it doesn\'t belongs to the user', async () => 
   {
      const pedro = await userRepository.store({
         email: 'pedro@mail.com',
         password: 'pass'
      });

      await expect(updateForm.run({
         title: '',
         questions: [
            {
               type: '',
               content: '',
               form_id: form.id,
               position: 1,
               required: false
            }
         ],
         form_id: form.id,
         user_id: pedro.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should update a form', async () => 
   {
      const updated = await updateForm.run({
         title: 'Formulário',
         description: '',
         questions: [
            ...form.questions,
            {
               type: '',
               content: '',
               position: 2,
               required: false,
               form_id: '1'
            }
         ],

         form_id: form.id,
         user_id: user.id
      });

      expect(updated.questions.length).toBeGreaterThan(1);
   });

   it('should not allow to update a form \'cause already exists a resolution delivered for it', async () => 
   {
      await resolutionRepository.store({
         delivered: true,
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: form.id,
         user_id: user.id
      });

      await expect(updateForm.run({
         title: 'Formulário',
         description: '',
         questions: [
            ...form.questions,
            {
               type: '',
               content: '',
               position: 2,
               required: false,
               form_id: '1'
            }
         ],

         form_id: form.id,
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });
});
