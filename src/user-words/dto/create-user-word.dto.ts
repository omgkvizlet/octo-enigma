import { AutoMap } from '@automapper/classes';

export class CreateUserWordDto {
  @AutoMap()
  wordID: number;
  @AutoMap()
  userID: number;
  @AutoMap()
  setID: number;
}
