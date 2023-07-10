import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class SingleWordDto {
  @AutoMap()
  @IsNotEmpty()
  source: string;

  @AutoMap()
  @IsNotEmpty()
  definition: string;

  @AutoMap()
  sex: string;

  @AutoMap()
  partOfSpeech: string;
}
