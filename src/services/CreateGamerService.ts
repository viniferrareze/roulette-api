import { getRepository } from 'typeorm';
import Gamer from '../models/Gamer';
import AppError from '../errors/AppError';
import Situation from '../models/Situation';
import Sequence from '../models/Sequence';

interface RequestDTO {
   date: Date;
}

export default class CreateGamerService {
   public async execute({ date }: RequestDTO): Promise<Gamer> {
      const gamerRepository = getRepository(Gamer);
      const situationRepository = getRepository(Situation);
      const sequenceRepository = getRepository(Sequence);

      if (!date) {
         throw new AppError('Date not informed!');
      }

      const gamer = await gamerRepository.create({ date });
      await gamerRepository.save(gamer);

      const situations = await situationRepository.find();

      const sequences: Sequence[] = [];
      await situations.forEach(async situation => {
         sequences.push(
            await sequenceRepository.create({ gamer_id: gamer.id, situation_id: situation.id, sequenceReset: false }),
         );
      });

      await sequenceRepository.save(sequences);

      return gamer;
   }
}
