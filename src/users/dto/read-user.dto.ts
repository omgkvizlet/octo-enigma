import { AutoMap } from '@automapper/classes';

export class ReadUserDto {
  @AutoMap()
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  fullName: string;

  @AutoMap()
  birthDate: string;
}
