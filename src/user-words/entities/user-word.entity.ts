import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from '../../words/entities/word.entity';
import { User } from '../../users/entities/user.entity';

export enum Status {
  UNKNOWN = 'Unknown',
  LEARNING = 'Learning',
  LEARNED = 'Learned',
}

@Entity()
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

  // @ManyToOne(() => User, (user) => user.userWords)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
