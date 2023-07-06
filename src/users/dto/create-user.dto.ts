import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  @AutoMap()
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  password: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  birthDate: string;
}
