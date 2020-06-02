import { getRepository, LessThan } from 'typeorm';
import Round from '../models/Round';
import Sequence from '../models/Sequence';
import AppError from '../errors/AppError';
import SequenceLog from '../models/SequenceLog';
import Stone from '../models/Stone';
import SequencieDiffService from './SequencieDiffService';
import UpdateSequencieGamerService from './UpdateSequencieGamerService';

interface RequestDTO {
   gamer_id: number;
   round_id: number;
   stone_id: number;
}

interface ResponseDTO {
   round: Round;
   sequenciesGamer: Sequence[];
}

export default class UpdateRoundService {
   public async execute({ gamer_id, stone_id, round_id }: RequestDTO): Promise<ResponseDTO> {
      const sequencieLogRepository = getRepository(SequenceLog);
      const stoneRepository = getRepository(Stone);
      const roundRepository = getRepository(Round);

      if (!gamer_id && !stone_id && !round_id) {
         throw new AppError('Not informaded gamer and stone id!');
      }

      // pega as sequencias do gamer, do round anterior...
      const sequenciesOldGamer = await sequencieLogRepository.find({
         relations: ['situation', 'sequence', 'round'],
         where: { gamer_id, round_id },
         order: { situation_id: 'ASC' },
      });

      if (!sequenciesOldGamer) {
         throw new AppError('Sequencie gamer old not found');
      }

      // pega o log e transforma no objeto de sequencia
      const sequenciesGamer = sequenciesOldGamer.map(sequencieOld => {
         const sequence = new Sequence();
         sequence.id = sequencieOld.sequence_id;
         sequence.gamer_id = sequencieOld.gamer_id;
         sequence.notification = sequencieOld.notification;
         sequence.sequenceReset = sequencieOld.sequenceReset;
         sequence.situation_id = sequencieOld.situation_id;
         sequence.situation = sequencieOld.situation;

         return sequence;
      });

      // busca o round para realizar a alteração
      const round = await roundRepository.findOne(round_id);

      if (!round) {
         throw new AppError('Round not found');
      }

      // busca os dados do round anterior
      const roundPrevius = await roundRepository.findOne({
         relations: ['stone'],
         where: { gamer_id, id: LessThan(round_id) },
         order: { id: 'DESC' },
      });

      // pega os dados da pedra jogada...
      const stone = await stoneRepository.findOne(stone_id);

      // verifica se veio qual é o round anterior
      if (roundPrevius && stone) {
         // pega as situações do numero jogado no round anterior e joga dentro de um array
         const situationPrevius = roundPrevius.stone.situations.split('-');
         // pega as situações do numero atual...
         const situations = stone.situations.split('-');

         // verifica as sequencias que são diferentes
         const sequenceDiffService = new SequencieDiffService();
         sequenceDiffService.execute(situationPrevius, situations);

         // pega as sequencias que foram atualizadas no round atual
         round.sequencie = sequenceDiffService.sequenciesDif?.join('-');
         round.sequencieReset = sequenceDiffService.sequenciesEquals?.join('-');

         // percore todas as sequencias do gamer e atualiza as notificações e sequencias...
         const updateSequencieGamerService = new UpdateSequencieGamerService();
         await updateSequencieGamerService.execute({
            sequenciesGamer,
            sequenciesDif: sequenceDiffService.sequenciesDif,
            sequenciesEquals: sequenceDiffService.sequenciesEquals,
         });
      }

      // salva a rodada
      await roundRepository.save(round);

      return { round, sequenciesGamer };
   }
}
