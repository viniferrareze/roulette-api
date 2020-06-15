import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Round from '../models/Round';
import Stone from '../models/Stone';
import Sequence from '../models/Sequence';
import SequenceLog from '../models/SequenceLog';
import SequencieDiffService from './SequencieDiffService';
import UpdateSequencieGamerService from './UpdateSequencieGamerService';

interface RequestDTO {
   gamer_id: number;
   stone_id: number;
}

interface ResponseDTO {
   round: Round;
   sequenciesGamer: Sequence[];
}

export default class CreateRoundService {
   public async execute({ gamer_id, stone_id }: RequestDTO): Promise<ResponseDTO> {
      const roundRepository = getRepository(Round);
      const sequencieRepository = getRepository(Sequence);
      const stoneRepository = getRepository(Stone);
      const sequencieLogRepository = getRepository(SequenceLog);

      if (!gamer_id && !stone_id) {
         throw new AppError('Not informaded gamer and stone id!');
      }

      // pega as sequencias do gamer...
      const sequenciesGamer = await sequencieRepository.find({
         relations: ['situation'],
         where: { gamer_id },
         order: { situation_id: 'ASC' },
      });

      // sequencia anterior;
      const sequenciesGamerOld = sequenciesGamer.map(sequence => ({ ...sequence }));

      // pega os dados da pedra jogada...
      const stone = await stoneRepository.findOne(stone_id);

      // cria o objeto do round.
      const round = await roundRepository.create({ gamer_id, stone_id });

      // busca os dados do round anterior
      const roundPrevius = await roundRepository.findOne({
         relations: ['stone'],
         where: { gamer_id },
         order: { id: 'DESC' },
      });

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

      // cria log de sequencia por round
      const sequenceGameLog: SequenceLog[] = [];

      await sequenciesGamerOld.forEach(async sequence => {
         sequenceGameLog.push(
            await sequencieLogRepository.create({
               gamer_id: sequence.gamer_id,
               round_id: round.id,
               sequence_id: sequence.id,
               situation_id: sequence.situation_id,
               notification: sequence.notification,
               sequenceReset: sequence.sequenceReset,
            }),
         );
      });

      // salva a sequencia de log....
      await sequencieLogRepository.save(sequenceGameLog);

      return { round, sequenciesGamer };
   }
}
