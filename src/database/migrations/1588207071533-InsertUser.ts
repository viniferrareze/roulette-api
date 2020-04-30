import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

export default class InsertUser1588207071533 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<any> {
      const hashPassword = await hash('roberto123!', 8);

      await queryRunner.manager
         .createQueryBuilder()
         .insert()
         .into('user')
         .values({ name: 'Roberto', username: 'roberto', password: hashPassword })
         .execute();
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
      await await queryRunner.manager.createQueryBuilder().delete().from('user').execute();
   }
}
