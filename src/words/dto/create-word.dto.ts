import { AutoMap } from '@automapper/classes';
import { SingleWordDto } from './single-word.dto';
import { IsInt } from 'class-validator';

export class CreateWordDto extends SingleWordDto {
  @IsInt()
  setID: number;
}
