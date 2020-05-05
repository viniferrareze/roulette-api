import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateRound1588355765615 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
         new Table({
            name: 'round',
            columns: [
               {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
               },

               {
                  name: 'gamer_id',
                  type: 'integer',
               },

               {
                  name: 'stone_id',
                  type: 'integer',
                  isNullable: true,
               },

               {
                  name: 'round_previus_id',
                  type: 'integer',
                  isNullable: true,
               },
               {
                  name: 'sequencie',
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

      await queryRunner.createForeignKey(
         'round',
         new TableForeignKey({
            name: 'RoundGamer',
            columnNames: ['gamer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'gamer',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
         }),
      );

      await queryRunner.createForeignKey(
         'round',
         new TableForeignKey({
            name: 'RoundStone',
            columnNames: ['stone_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'stone',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('round', 'RoundStone');

      await queryRunner.dropForeignKey('round', 'RoundGamer');

      await queryRunner.dropTable('round');
   }
}
