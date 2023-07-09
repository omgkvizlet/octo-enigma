import { AutoMap } from '@automapper/classes';

export class SingleWordDto {
  @AutoMap()
  source: string;

  @AutoMap()
  definition: string;

  @AutoMap()
  sex: string;

  @AutoMap()
  partOfSpeech: string;
}
