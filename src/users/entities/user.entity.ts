import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  fullName: string;

  @Column()
  password: string;

  @Column()
  birthDate: Date;

  age: number;

  @AfterLoad()
  aggregate() {
    this.fullName = this.firstName + ' ' + this.lastName;
    this.age =
      new Date(Date.now() - this.birthDate.getTime()).getUTCFullYear() - 1970;
  }
}
