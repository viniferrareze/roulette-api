import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import auth from '../config/auth';
import User from '../models/User';

interface RequestDTO {
   username: string;
   password: string;
}

interface ResponseDTO {
   user: User;
   token: string;
}

export default class AuthenticateService {
   public async execute({ username, password }: RequestDTO): Promise<ResponseDTO> {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ where: { username } });

      if (!user) {
         throw new AppError('Incorret username/password combination', 401);
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
         throw new AppError('Incorret email/password combination', 401);
      }

      const token = sign({}, auth.jwt.secret, { subject: String(user.id), expiresIn: auth.jwt.expiresIn });

      return {
         user,
         token,
      };
   }
}
