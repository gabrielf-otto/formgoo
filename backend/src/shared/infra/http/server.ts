import 'dotenv/config';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';
import 'express-async-errors';

import routes from './routes';  // Routes
import '@shared/infra/typeorm'; // Database
import '@shared/container';     // Providers

import rateLimiter from '../http/middlewares/rateLimiter';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';


const app = express();
app.use(express.json());
app.use(rateLimiter);
app.use(cors());
app.use(routes);
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use((err: Error, 
   request: Request, 
   response: Response, 
   next: NextFunction
) => {
   if (err instanceof AppError) 
   {
      return response.status(err.statusCode).json({
         status: 'error',
         error: err.message
      });
   }

   // To degub
   console.error(err);

   return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
   });
});

app.listen(3333, () => {
   console.log(`Listening on port 3333...`);
});
