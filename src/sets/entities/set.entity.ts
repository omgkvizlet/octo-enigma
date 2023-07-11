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
import { AutoMap } from '@automapper/classes';

export enum Lang {
  ENG = 'English',
  UKR = 'Ukrainian',
  CZ = 'Czech',
  DE = 'German',
  JA = 'Japan',
  SQ = 'Albanian',
}

@Entity('sets')
export class Set {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ default: true })
  @AutoMap()
  isPrivate: boolean;

  @Column({
    type: 'enum',
    enum: Lang,
    default: Lang.ENG,
  })
  @AutoMap()
  fromLanguage: Lang;

  @Column({
    type: 'enum',
    enum: Lang,
    default: Lang.UKR,
  })
  @AutoMap()
  toLanguage: Lang;

  @Column({ default: false })
  @AutoMap()
  starred: boolean;

  @UpdateDateColumn()
  @AutoMap()
  lastUpdated: Date;

  @OneToMany(() => Word, (word) => word.set)
  @AutoMap()
  words: Word[];

  @ManyToMany(() => User, (user) => user.sets)
  @JoinTable()
  @AutoMap()
  authors: User[];
}
