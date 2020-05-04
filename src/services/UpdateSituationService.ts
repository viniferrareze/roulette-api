import { getRepository } from 'typeorm';
import Situation from '../models/Situation';
import AppError from '../errors/AppError';

interface RequestDTO {
   situation_id: number;
   active: boolean;
   amount_notification: number;
}

export default class UpdateSituationService {
   public async excetute({ situation_id, active, amount_notification }: RequestDTO): Promise<Situation> {
      const situationRepository = getRepository(Situation);

      const situation = await situationRepository.findOne(situation_id);

      if (!situation) {
         throw new AppError('Incorret situation', 400);
      }

      situation.active = active;
      situation.amount_notification = amount_notification;

      await situationRepository.save(situation);

      return situation;
   }
}
