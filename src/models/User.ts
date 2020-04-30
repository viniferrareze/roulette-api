import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export default class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   username: string;

   @Column()
   password: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
