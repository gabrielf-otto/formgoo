import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptProvider from './HashProvider/implementations/BCryptProvider';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JWTProvider from './TokenProvider/implementations/JWTProvider';


container.registerSingleton<IHashProvider>(
   'HashProvider',
   BCryptProvider
);

container.registerSingleton<ITokenProvider>(
   'TokenProvider',
   JWTProvider
)
