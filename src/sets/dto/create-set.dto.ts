import { AutoMap } from '@automapper/classes';
import { SingleWordDto } from './single-word.dto';
import { Word } from '../../words/entities/word.entity';
import { UpdateSetDto } from './update-set.dto';

export class CreateSetDto extends UpdateSetDto {
  @AutoMap(() => [Word])
  words: SingleWordDto[] = [];
}
