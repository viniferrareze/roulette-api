import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateSequenceLog1590520299060 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
         new Table({
            name: 'sequenceLog',
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
                  name: 'sequence_id',
                  type: 'integer',
               },

               {
                  name: 'round_id',
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
         'sequenceLog',
         new TableForeignKey({
            name: 'SequenceLogGamer',
            columnNames: ['gamer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'gamer',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
         }),
      );

      await queryRunner.createForeignKey(
         'sequenceLog',
         new TableForeignKey({
            name: 'SequenceLogSequence',
            columnNames: ['sequence_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sequence',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
         }),
      );

      await queryRunner.createForeignKey(
         'sequenceLog',
         new TableForeignKey({
            name: 'SequenceLogRound',
            columnNames: ['round_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sequence',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
         }),
      );

      await queryRunner.createForeignKey(
         'sequenceLog',
         new TableForeignKey({
            name: 'SequenceLogSituation',
            columnNames: ['situation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'situation',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('sequenceLog', 'SequenceLogSituation');
      await queryRunner.dropForeignKey('sequenceLog', 'SequenceLogSequence');
      await queryRunner.dropForeignKey('sequenceLog', 'SequenceLogRound');
      await queryRunner.dropForeignKey('sequenceLog', 'SequenceLogGamer');

      await queryRunner.dropTable('sequenceLog');
   }
}
