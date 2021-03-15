import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ITokenRepository from '@modules/users/repositories/ITokenRepository';
import TokenRepository from '@modules/users/infra/typeorm/repositories/TokenRepository';

import IFormRepository from '@modules/forms/repositories/IFormRepository';
import FormRepository from '@modules/forms/infra/typeorm/repositories/FormRepository';

import IResolutionRepository from '@modules/forms/repositories/IResolutionRepository';
import ResolutionRepository from '@modules/forms/infra/typeorm/repositories/ResolutionRepository';


container.registerSingleton<IUserRepository>(
   'UserRepository', 
   UserRepository
);

container.registerSingleton<ITokenRepository>(
   'TokenRepository', 
   TokenRepository
);

container.registerSingleton<IFormRepository>(
   'FormRepository', 
   FormRepository
);

container.registerSingleton<IResolutionRepository>(
   'ResolutionRepository', 
   ResolutionRepository
);
