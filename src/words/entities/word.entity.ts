import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Set } from '../../sets/entities/set.entity';

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  definition: string;

  @ManyToOne(() => Set, (set) => set.words)
  set: Set;
}
