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
import Stone from './Stone';

@Entity('round')
export default class Round {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   gamer_id: number;

   @ManyToOne(() => Gamer)
   @JoinColumn({ name: 'gamer_id' })
   gamer: Gamer;

   @Column()
   stone_id: number;

   @ManyToOne(() => Stone)
   @JoinColumn({ name: 'stone_id' })
   stone: Stone;

   @Column()
   round_previus_id: number;

   @Column()
   sequencie: string;

   @Column()
   sequencieReset: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
