import { PartialType } from '@nestjs/mapped-types';
import { CreateSetDto } from './create-set.dto';
import { AutoMap } from '@automapper/classes';

export class UpdateSetDto {
  @AutoMap()
  name: string;

  @AutoMap()
  isPrivate: boolean;

  @AutoMap()
  fromLanguage: string;

  @AutoMap()
  toLanguage: string;
}
