import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @AutoMap()
  @IsNotEmpty()
  username: string;

  @AutoMap()
  @IsEmail()
  email: string;

  @AutoMap()
  @Length(8)
  password: string;

  @AutoMap()
  @IsNotEmpty()
  firstName: string;

  @AutoMap()
  @IsNotEmpty()
  lastName: string;

  @AutoMap()
  @IsNotEmpty()
  birthDate: string;
}
