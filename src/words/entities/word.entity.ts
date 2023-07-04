import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Set } from '../../sets/entities/set.entity';

export enum Sex {
  MASCULINE = 'm',
  FEMININE = 'f',
  NEUTER = 'n',
}

export enum PartOfSpeech {
  NOUN = 'noun',
  ADJ = 'adj',
}

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  definition: string;

  @Column({
    type: 'enum',
    enum: Sex,
    default: Sex.MASCULINE,
  })
  sex: Sex;

  @Column({
    type: 'enum',
    enum: PartOfSpeech,
    default: PartOfSpeech.NOUN,
  })
  partOfSpeech: PartOfSpeech;

  @ManyToOne(() => Set, (set) => set.words)
  set: Set;
}
