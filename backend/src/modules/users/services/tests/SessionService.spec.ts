import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import FakeTokenProvider from '../../providers/TokenProvider/fakes/FakeTokenProvider';

import CreateUserService from '../CreateUserService';
import SessionsService from '../SessionService';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../../repositories/IUserRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import ITokenProvider from '../../providers/TokenProvider/models/ITokenProvider';


let userRepository: IUserRepository;
let hashProvider: IHashProvider;
let tokenProvider: ITokenProvider;

let createUserService: CreateUserService;
let sessionsService: SessionsService;


describe('SessionsService', () => 
{
   beforeEach(() => 
   {
      userRepository = new FakeUserRepository();
      hashProvider = new FakeHashProvider();
      tokenProvider = new FakeTokenProvider();

      createUserService = new CreateUserService(
         userRepository,
         hashProvider
      );

      sessionsService = new SessionsService(
         userRepository, 
         hashProvider,
         tokenProvider
      );
   });

   it('should validate user\'s data an generate a token', async () => 
   {

      await createUserService.run({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      const data = await sessionsService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      expect(data).toHaveProperty('token');
   });

   it('should not pass in email/user validation', async () => 
   {
      await expect(sessionsService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not pass in password match validation', async () => 
   {
      await createUserService.run({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      await expect(sessionsService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '22360'
      })
      ).rejects.toBeInstanceOf(AppError);
   });
});
