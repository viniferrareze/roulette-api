import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateSequence1588437065923 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
         new Table({
            name: 'sequence',
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
                  name: 'situation_id',
                  type: 'integer',
               },

               {
                  name: 'notification',
                  type: 'integer',
                  isNullable: true,
               },

               {
                  name: 'sequenceReset',
                  type: 'boolean',
                  default: 'false',
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
         'sequence',
         new TableForeignKey({
            name: 'SequenceGamer',
            columnNames: ['gamer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'gamer',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
         }),
      );

      await queryRunner.createForeignKey(
         'sequence',
         new TableForeignKey({
            name: 'SequenceSituation',
            columnNames: ['situation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'situation',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('sequence', 'SequenceSituation');
      await queryRunner.dropForeignKey('sequence', 'SequenceGamer');

      await queryRunner.dropTable('sequence');
   }
}
