import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';


let userRepository: IUserRepository;
let hashProvider: IHashProvider;
let createUserService: CreateUserService;


describe('CreateUser', () => {
   beforeEach(() => 
   {
      userRepository = new FakeUserRepository();
      hashProvider = new FakeHashProvider();

      createUserService = new CreateUserService(
         userRepository,
         hashProvider
      );
   });

   it('should create a new user', async () => 
   {
      const user = await createUserService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      expect(user).toHaveProperty('id');
   });

   it('should not allow to create an user with an email that already exists', async () => 
   {
      await createUserService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      await expect(createUserService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      }))
      .rejects.toBeInstanceOf(AppError);
   });
});
