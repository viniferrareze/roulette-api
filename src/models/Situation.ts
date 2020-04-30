import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('situation')
export default class Situation {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   description: string;

   @Column()
   information: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
