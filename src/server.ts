import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import routes from './routes';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use(routes);
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
   if (err instanceof AppError) {
      return res.status(err.statusCode).json({ status: 'error', error: err.message });
   }

   console.error(err);

   return res.status(500).json({ status: 'error', message: 'internal server error!' });
});

app.listen(3333, () => {
   console.log('Servidor rodando...');
});
