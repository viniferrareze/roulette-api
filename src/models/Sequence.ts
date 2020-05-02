import {
   Entity,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   PrimaryGeneratedColumn,
   ManyToMany,
   JoinColumn,
} from 'typeorm';

import Gamer from './Gamer';
import Situation from './Situation';

@Entity('sequence')
export default class Sequence {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   gamer_id: number;

   @ManyToMany(() => Gamer)
   @JoinColumn({ name: 'gamer_id' })
   gamer: Gamer;

   @Column()
   situation_id: number;

   @ManyToMany(() => Situation)
   @JoinColumn({ name: 'situation_id' })
   situation: Situation;

   @Column()
   notification: number;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
