import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Set } from '../../sets/entities/set.entity';
import { AutoMap } from "@automapper/classes";

export enum Sex {
  MASCULINE_ANIMATE = 'm. živ.',
  MASCULINE_INANIMATE = 'm. nživ.',
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
  @AutoMap()
  source: string;

  // TODO automap array
  @Column()
  @AutoMap()
  definition: string;

  @Column({
    type: 'enum',
    enum: Sex,
    default: Sex.MASCULINE_ANIMATE,
  })
  @AutoMap()
  sex: Sex;

  @Column({
    type: 'enum',
    enum: PartOfSpeech,
    default: PartOfSpeech.NOUN,
  })
  @AutoMap()
  partOfSpeech: PartOfSpeech;

  @ManyToOne(() => Set, (set) => set.words, { onDelete: 'CASCADE' })
  set: Set;
}
