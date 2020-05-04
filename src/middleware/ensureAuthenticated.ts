import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
   // validacao token JWT;
   const auth = req.headers.authorization;

   if (!auth) {
      throw new AppError('JWT token is missing', 403);
   }

   const [, token] = auth.split(' ');

   try {
      const decode = verify(token, authConfig.jwt.secret);

      // força que o decode seja do tipo TokenPayload
      const { sub } = decode as TokenPayload;

      req.user = {
         id: sub,
      };

      return next();
   } catch {
      throw new AppError('Invalid JWT token');
   }
}
