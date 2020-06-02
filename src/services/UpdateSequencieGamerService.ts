import { getRepository } from 'typeorm';
import Sequence from '../models/Sequence';

interface RequestDTO {
   sequenciesGamer: Sequence[];
   sequenciesDif: string[];
   sequenciesEquals: string[];
}

interface ResponseDTO {
   sequenciesGamer: Sequence[];
}

export default class UpdateSequencieGamerService {
   public async execute({ sequenciesGamer, sequenciesDif, sequenciesEquals }: RequestDTO): Promise<ResponseDTO> {
      const sequencieRepository = getRepository(Sequence);

      // percore todas as sequencias do gamer e atualiza as notificações e sequencias...
      sequenciesGamer.map(sequencieGamer => {
         const sequencieDif = sequenciesDif?.find(seq => Number(seq) === Number(sequencieGamer.situation_id));

         if (sequencieDif) {
            if (sequencieGamer.sequenceReset) {
               sequencieGamer.sequenceReset = false;
            } else {
               sequencieGamer.notification++;
            }
         } else {
            // se a sequencia for igual
            const sequenciesEqual = sequenciesEquals?.find(seq => Number(seq) === Number(sequencieGamer.situation_id));

            // quando for zerado não pode ser levando em concideração
            if (sequenciesEqual && sequencieGamer.notification > 0) {
               sequencieGamer.notification = 0;
               sequencieGamer.sequenceReset = true;
            }
         }

         return { ...sequencieGamer };
      });

      await sequencieRepository.save(sequenciesGamer);

      return { sequenciesGamer };
   }
}
