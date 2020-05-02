import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertSituation1588036611097 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager
         .createQueryBuilder()
         .insert()
         .into('situation')
         .values([
            { id: 1, description: 'Impar', information: null },
            { id: 2, description: 'Par', information: null },
            { id: 3, description: 'Preto', information: null },
            { id: 4, description: 'Vermelho', information: null },
            { id: 5, description: 'Pequenas', information: '1 ao 18' },
            { id: 6, description: 'Grandes', information: '19 ao 36' },
            { id: 7, description: 'Duzia 1', information: '1 ao 12' },
            { id: 8, description: 'Duzia 2', information: '13 ao 24' },
            { id: 9, description: 'Duzia 3', information: '25 ao 36' },
            { id: 10, description: 'Coluna 1', information: '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31 e 34' },
            { id: 11, description: 'Coluna 2', information: '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32 e 35' },
            { id: 12, description: 'Coluna 3', information: '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33 e 36' },
         ])
         .execute();
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await await queryRunner.manager.createQueryBuilder().delete().from('situation').execute();
   }
}
