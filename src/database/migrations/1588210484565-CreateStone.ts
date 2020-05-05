import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStone1588210484565 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
         new Table({
            name: 'stone',
            columns: [
               {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  // generationStrategy: 'increment',
               },
               {
                  name: 'situations',
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

   public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('stone');
   }
}
