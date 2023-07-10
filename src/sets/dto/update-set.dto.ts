import { PartialType } from '@nestjs/mapped-types';
import { CreateSetDto } from './create-set.dto';
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class UpdateSetDto {
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @IsNotEmpty()
  isPrivate: boolean;

  @AutoMap()
  @IsNotEmpty()
  fromLanguage: string;

  @AutoMap()
  @IsNotEmpty()
  toLanguage: string;
}
