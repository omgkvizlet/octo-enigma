import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  typeConverter,
} from '@automapper/core';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ReadUserDto } from '../../users/dto/read-user.dto';
import { CreateSetDto } from './create-set.dto';
import { Set } from '../entities/set.entity';
import { SingleWordDto } from '../../words/dto/single-word.dto';
import { Word } from '../../words/entities/word.entity';
import { UpdateSetDto } from './update-set.dto';

@Injectable()
export class SetProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CreateSetDto,
        Set,
        forMember(
          (dest) => dest.words,
          mapFrom((source) => {
            console.log(source);
            return mapper.mapArray(source.words, SingleWordDto, Word);
          }),
        ),
      );

      createMap(mapper, UpdateSetDto, Set);
    };
  }
}
