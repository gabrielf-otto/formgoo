import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFormRepository from '../repositories/fakes/FakeFormRepository';
import FakeResolutionRepository from '../repositories/fakes/FakeResolutionRepository';
import CreateResolutionService from './CreateResolutionService';

import Resolution from '../infra/typeorm/entities/Resolution';
import User from '@modules/users/infra/typeorm/entities/User';
import Form from '../infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';


let formRepository: FakeFormRepository;
let resolutionRepository: FakeResolutionRepository;
let createResolution: CreateResolutionService;

let userRepository: FakeUserRepository;

let user: User;
let form: Form;


describe('CreateResolution', () => 
{
   beforeEach(async () => 
   {
      userRepository = new FakeUserRepository();
      formRepository = new FakeFormRepository();
      resolutionRepository = new FakeResolutionRepository();

      createResolution = new CreateResolutionService(
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
         user_id: user.id,

         questions: [
            {
               type: '',
               content: '',
               position: 1,
               required: true,
               options: [],
               form_id: '1'
            }
         ]
      });
   });

   it('should not find the form', async () => 
   {
      await expect(createResolution.run({
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: '#',
         from: 'pedr.@mail.com'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should create a resolution', async () => 
   {
      const resolution = await createResolution.run({
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: form.id,
         from: 'pedro.@mail.com'
      });

      expect(resolution).toBeInstanceOf(Resolution);
   });

   it('should not allow an user to create a resolution to his own forms', async () => 
   {
      await expect(createResolution.run({
         answers: [
            {
               content: '',
               question_id: '1',
               resolution_id: '1'
            }
         ],
         form_id: form.id,
         from: 'gabriel@mail.com'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

});
