/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Round from '../models/Round';
import Stone from '../models/Stone';
import Sequence from '../models/Sequence';

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

      if (!gamer_id || !stone_id) {
         throw new AppError('Not informaded gamer and stone id!');
      }

      // pega as sequencias do gamer...
      const sequenciesGamer = await sequencieRepository.find({
         relations: ['situation'],
         where: { gamer_id },
         order: { situation_id: 'ASC' },
      });

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
         const sequenciesDif: string[] = [];
         const sequenciesEquals: string[] = [];
         for (let index = 0; index < situationPrevius.length; index++) {
            // posição 3 do array sempre é referente a duzia, e quando for duzia devo atualizar as duzias diferentes
            if (index === 3) {
               if (situationPrevius[index] === situations[index]) {
                  sequenciesEquals.push(situations[index]);
               }

               const duziaAtual = situations[index];

               for (let duzia = 7; duzia <= 9; duzia++) {
                  if (Number(duziaAtual) !== duzia) {
                     sequenciesDif.push(String(duzia));
                  }
               }

               continue;
            }

            if (index === 4) {
               if (situationPrevius[index] === situations[index]) {
                  sequenciesEquals.push(situations[index]);
               }

               const colunaAtual = situations[index];

               for (let coluna = 10; coluna <= 12; coluna++) {
                  if (Number(colunaAtual) !== coluna) {
                     sequenciesDif.push(String(coluna));
                  }
               }

               continue;
            }

            if (situationPrevius[index] !== situations[index]) {
               sequenciesDif.push(situationPrevius[index]);
            } else {
               sequenciesEquals.push(situationPrevius[index]);
            }
         }

         // pega as sequencias que foram atualizadas no round atual
         round.sequencie = sequenciesDif?.join('-');
         round.sequencieReset = sequenciesEquals?.join('-');

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
               const sequenciesEqual = sequenciesEquals?.find(
                  seq => Number(seq) === Number(sequencieGamer.situation_id),
               );

               // quando for zerado não pode ser levando em concideração
               if (sequenciesEqual && sequencieGamer.notification > 0) {
                  sequencieGamer.notification = 0;
                  sequencieGamer.sequenceReset = true;
               }
            }

            return { ...sequencieGamer };
         });

         await sequencieRepository.save(sequenciesGamer);
      }

      // salva a rodada
      await roundRepository.save(round);

      return { round, sequenciesGamer };
   }
}
