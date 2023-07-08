import { AutoMap } from '@automapper/classes';
import { SingleWordDto } from './single-word.dto';
import { Word } from '../../words/entities/word.entity';

export class CreateSetDto {
  @AutoMap()
  name: string;

  @AutoMap()
  isPrivate: boolean;

  @AutoMap()
  fromLanguage: string;

  @AutoMap()
  toLanguage: string;

  @AutoMap(() => [Word])
  words: SingleWordDto[] = [];
}
