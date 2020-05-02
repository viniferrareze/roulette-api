import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('situation')
export default class Situation {
   @PrimaryColumn()
   id: number;

   @Column()
   description: string;

   @Column()
   information: string;

   @Column()
   active: boolean;

   @Column()
   amount_notification: number;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
