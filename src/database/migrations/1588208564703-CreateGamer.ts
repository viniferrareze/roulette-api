import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGamer1588208564703 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
         new Table({
            name: 'gamer',
            columns: [
               {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
               },
               {
                  name: 'date',
                  type: 'timestamp with time zone',
                  isNullable: false,
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
      await queryRunner.dropTable('gamer');
   }
}
