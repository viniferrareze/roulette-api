import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSituation1588035825485 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'situation',
            columns: [
               {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  // isGenerated: true,
                  // generationStrategy: 'increment',
               },
               {
                  name: 'description',
                  type: 'varchar',
                  isNullable: false,
               },
               {
                  name: 'information',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
               },
               {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('situation');
   }
}
