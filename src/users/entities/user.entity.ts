import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Set } from '../../sets/entities/set.entity';

@Entity('users')
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @AutoMap()
  username: string;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  @AutoMap()
  firstName: string;

  @Column()
  @AutoMap()
  lastName: string;

  fullName: string;

  @Column()
  @AutoMap()
  password: string;

  @Column()
  @AutoMap(() => Date)
  birthDate: Date;

  age: number;

  @ManyToMany(() => Set, (set) => set.authors, { eager: true })
  sets: Set[];

  @AfterLoad()
  aggregate() {
    this.fullName = this.firstName + ' ' + this.lastName;
    this.age =
      new Date(Date.now() - this.birthDate.getTime()).getUTCFullYear() - 1970;
  }
}
