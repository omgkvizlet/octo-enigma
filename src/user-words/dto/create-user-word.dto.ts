import { AutoMap } from '@automapper/classes';

export class CreateUserWordDto {
  @AutoMap()
  wordID: number;
  @AutoMap()
  setID: number;
}
