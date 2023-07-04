import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Set } from '../../sets/entities/set.entity';

export enum ActionType {
  EDIT = 'Edit',
  STUDY = 'Study',
}

@Entity('interactions')
export class Interaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column({
    type: 'enum',
    enum: ActionType,
    default: ActionType.EDIT,
  })
  type: ActionType;

  @OneToOne(() => Set)
  @JoinColumn()
  set: Set;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
