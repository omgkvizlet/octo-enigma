import { AutoMap } from '@automapper/classes';
import { SingleWordDto } from './single-word.dto';

export class CreateWordDto extends SingleWordDto {
  setID: number;
}
