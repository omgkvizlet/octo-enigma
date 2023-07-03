import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from '../../words/entities/word.entity';
import { User } from '../../users/entities/user.entity';

export enum Lang {
  ENG = 'English',
  UKR = 'Ukrainian',
  CZ = 'Czech',
  DE = 'German',
  NONE = 'Kokot',
}

@Entity()
export class Set {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isPrivate: boolean;

  @Column({
    type: 'enum',
    enum: Lang,
    default: Lang.NONE,
  })
  sourceLang: Lang;

  @Column({
    type: 'enum',
    enum: Lang,
    default: Lang.NONE,
  })
  defLang: Lang;

  @OneToMany(() => Word, (word) => word.set)
  words: Word[];

  @ManyToMany(() => User)
  @JoinTable()
  authors: User[];
}
