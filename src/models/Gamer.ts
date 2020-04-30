import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gamer')
export default class Situation {
   @PrimaryGeneratedColumn()
   id: number;

   @Column('time with time zone')
   date: Date;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
