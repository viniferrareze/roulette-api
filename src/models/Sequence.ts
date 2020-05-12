import {
   Entity,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   PrimaryGeneratedColumn,
   JoinColumn,
   ManyToOne,
} from 'typeorm';

import Gamer from './Gamer';
import Situation from './Situation';

@Entity('sequence')
export default class Sequence {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   gamer_id: number;

   @ManyToOne(() => Gamer)
   @JoinColumn({ name: 'gamer_id' })
   gamer: Gamer;

   @Column()
   situation_id: number;

   @ManyToOne(() => Situation)
   @JoinColumn({ name: 'situation_id' })
   situation: Situation;

   @Column()
   notification: number;

   @Column()
   sequenceReset: boolean;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
