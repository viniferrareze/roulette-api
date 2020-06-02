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
import Sequence from './Sequence';
import Round from './Round';

@Entity('sequenceLog')
export default class SequenceLog {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   gamer_id: number;

   @ManyToOne(() => Gamer)
   @JoinColumn({ name: 'gamer_id' })
   gamer: Gamer;

   @Column()
   sequence_id: number;

   @ManyToOne(() => Sequence)
   @JoinColumn({ name: 'sequence_id' })
   sequence: Sequence;

   @Column()
   round_id: number;

   @ManyToOne(() => Round)
   @JoinColumn({ name: 'round_id' })
   round: Round;

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
