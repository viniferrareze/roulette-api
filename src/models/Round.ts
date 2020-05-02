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
import Stone from './Stone';

@Entity('round')
export default class Round {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   gamer_id: number;

   @ManyToMany(() => Gamer)
   @JoinColumn({ name: 'gamer_id' })
   gamer: Gamer;

   @Column()
   stone_id: number;

   @ManyToMany(() => Stone)
   @JoinColumn({ name: 'stone_id' })
   number: Stone;

   @Column()
   round_previus_id: number;

   @Column()
   sequencie: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}
