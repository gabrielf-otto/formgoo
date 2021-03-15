import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';


interface Payload {
   iat: number;
   exp: number;
   sub: string;
}

export default function auth(
   request: Request, 
   response: Response, 
   next: NextFunction
): void 
{
   const { authorization } = request.headers;
   if (!authorization) 
   {
      throw new AppError(
         'JWT token is missing', 
         401
      );
   }

   const [, token] = authorization.split(' ');
   try {
      const payload = verify(token, authConfig.jwt.secret);
      const { sub } = payload as Payload;

      request.user = { 
         id: sub 
      };

      return next();
   }
   catch {
      throw new AppError(
         'Invalid JWT token', 
         401
      );
   }
}
