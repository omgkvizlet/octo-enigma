import { AutoMap } from '@automapper/classes';
import { SingleWordDto } from '../../sets/dto/single-word.dto';

export class CreateWordDto extends SingleWordDto {
  setID: number;
}
