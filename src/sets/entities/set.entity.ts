import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Word } from '../../words/entities/word.entity';
import { User } from '../../users/entities/user.entity';

export enum Lang {
  ENG = 'English',
  UKR = 'Ukrainian',
  CZ = 'Czech',
  DE = 'German',
}

@Entity('sets')
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
    default: Lang.ENG,
  })
  sourceLang: Lang;

  @Column({
    type: 'enum',
    enum: Lang,
    default: Lang.UKR,
  })
  defLang: Lang;

  @Column({ default: false })
  starred: boolean;

  @UpdateDateColumn()
  lastUpdated: Date;

  @OneToMany(() => Word, (word) => word.set)
  words: Word[];

  @ManyToMany(() => User)
  @JoinTable()
  authors: User[];
}
