import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertNumber1588349425875 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager
         .createQueryBuilder()
         .insert()
         .into('stone')
         .values([
            { id: 0, situations: null },
            { id: 1, situations: '1-4-5-7-10' },
            { id: 2, situations: '2-3-5-7-11' },
            { id: 3, situations: '1-4-5-7-12' },

            { id: 4, situations: '2-3-5-7-10' },
            { id: 5, situations: '1-4-5-7-11' },
            { id: 6, situations: '2-3-5-7-12' },

            { id: 7, situations: '1-4-5-7-10' },
            { id: 8, situations: '2-3-5-7-11' },
            { id: 9, situations: '1-4-5-7-12' },

            { id: 10, situations: '2-3-5-7-10' },
            { id: 11, situations: '1-3-5-7-11' },
            { id: 12, situations: '2-4-5-7-12' },

            { id: 13, situations: '1-3-5-8-10' },
            { id: 14, situations: '2-4-5-8-11' },
            { id: 15, situations: '1-3-5-8-12' },

            { id: 16, situations: '2-4-5-8-10' },
            { id: 17, situations: '1-3-5-8-11' },
            { id: 18, situations: '2-4-5-8-12' },

            { id: 19, situations: '1-4-6-8-10' },
            { id: 20, situations: '2-3-6-8-11' },
            { id: 21, situations: '1-4-6-8-12' },

            { id: 22, situations: '2-3-6-8-10' },
            { id: 23, situations: '1-4-6-8-11' },
            { id: 24, situations: '2-3-6-8-12' },

            { id: 25, situations: '1-4-6-9-10' },
            { id: 26, situations: '2-3-6-9-11' },
            { id: 27, situations: '1-4-6-9-12' },

            { id: 28, situations: '2-3-6-9-10' },
            { id: 29, situations: '1-3-6-9-11' },
            { id: 30, situations: '2-4-6-9-12' },

            { id: 31, situations: '1-3-6-9-10' },
            { id: 32, situations: '2-4-6-9-11' },
            { id: 33, situations: '1-3-6-9-12' },

            { id: 34, situations: '2-4-6-9-10' },
            { id: 35, situations: '1-3-6-9-11' },
            { id: 36, situations: '2-4-6-9-12' },
         ])
         .execute();
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await await queryRunner.manager.createQueryBuilder().delete().from('stone').execute();
   }
}
