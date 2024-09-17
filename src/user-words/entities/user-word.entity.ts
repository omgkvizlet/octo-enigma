import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from '../../words/entities/word.entity';
import { User } from '../../users/entities/user.entity';
import { Set } from '../../sets/entities/set.entity';

export enum Status {
  UNKNOWN = 'Unknown',
  LEARNING = 'Learning',
  LEARNED = 'Learned',
}

@Entity('user-words')
export class UserWord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.UNKNOWN,
  })
  status: Status;

  @Column({ default: false })
  starred: boolean;

  @OneToOne(() => Word)
  @JoinColumn()
  word: Word;

  // TODO Make it with complex join using word.set or leave it such ???
  @OneToOne(() => Set)
  @JoinColumn()
  set: Set;

  // @ManyToOne(() => User, (user) => user.userWords)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
