import { getRepository } from 'typeorm';
import Gamer from '../models/Gamer';
import AppError from '../errors/AppError';

interface RequestDTO {
   date: Date;
}

export default class CreateGamerService {
   public async execute({ date }: RequestDTO): Promise<Gamer> {
      const gamerRepository = getRepository(Gamer);

      if (!date) {
         throw new AppError('Date not informed!');
      }

      const gamer = await gamerRepository.create({ date });

      await gamerRepository.save(gamer);

      return gamer;
   }
}
