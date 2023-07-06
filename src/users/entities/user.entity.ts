import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

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

  @AfterLoad()
  aggregate() {
    this.fullName = this.firstName + ' ' + this.lastName;
    this.age =
      new Date(Date.now() - this.birthDate.getTime()).getUTCFullYear() - 1970;
  }
}
