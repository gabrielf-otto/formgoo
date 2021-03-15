import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFormRepository from '../repositories/fakes/FakeFormRepository';
import FakeResolutionRepository from '../repositories/fakes/FakeResolutionRepository';

import UpdateResolutionService from './UpdateResolutionService';

import User from '@modules/users/infra/typeorm/entities/User';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';


let userRepository: FakeUserRepository;
let formRepository: FakeFormRepository;
let resolutionRepository: FakeResolutionRepository;

let updateResolution: UpdateResolutionService;

let user: User;
let form: Form;


describe('CreateResolution', () => 
{
   beforeEach(async () => 
   {
      userRepository = new FakeUserRepository();
      formRepository = new FakeFormRepository();
      resolutionRepository = new FakeResolutionRepository();

      updateResolution = new UpdateResolutionService(
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
      await expect(updateResolution.run({
         delivered: false,
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: form.id,
         user_id: '#'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not find the form', async () => 
   {
      await expect(updateResolution.run({
         delivered: false,
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: '#',
         user_id: user.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should update a resolution', async () => 
   {
      const pedro = await userRepository.store({
         email: 'pedro@mail.com',
         password: 'pass'
      });

      pedro.forms = [form];

      await resolutionRepository.store({
         delivered: false,
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: form.id,
         user_id: pedro.id
      });

      const updated = await updateResolution.run({
         delivered: true,
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: form.id,
         user_id: pedro.id
      });

      expect(updated.answers).toEqual(expect.arrayContaining([{
         content: '',
         question_id: '1',
         resolution_id: '1'
      }]));
   });
   
   it('should not find a resolution to the specified form', async () => 
   {
      const pedro = await userRepository.store({
         email: 'pedro@mail.com',
         password: 'pass'
      });

      pedro.forms = [form];

      await expect(updateResolution.run({
         delivered: true,
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: form.id,
         user_id: pedro.id
      }))
      .rejects.toBeInstanceOf(AppError);
   });
});
