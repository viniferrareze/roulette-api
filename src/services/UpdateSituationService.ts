import { getRepository } from 'typeorm';
import Situation from '../models/Situation';
import AppError from '../errors/AppError';

interface RequestDTO {
   situations: Situation[];
}

export default class UpdateSituationService {
   public async excetute({ situations }: RequestDTO): Promise<Situation[]> {
      const situationRepository = getRepository(Situation);

      if (!situations) {
         throw new AppError('Incorret situation', 400);
      }

      try {
         await situationRepository.save(situations);

         return situations;
      } catch (error) {
         throw new AppError('Invalid situations');
      }
   }
}
