import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { CreateUserWordDto } from './create-user-word.dto';
import { UserWord } from '../entities/user-word.entity';
import { Word } from '../../words/entities/word.entity';
import { Set } from '../../sets/entities/set.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UserWordProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // createMap(mapper, SingleWordDto, Word);
      //
      createMap(
        mapper,
        CreateUserWordDto,
        UserWord,
        forMember(
          (dest) => dest.word,
          mapFrom((source) => {
            return { id: +source.wordID } as Word;
          }),
        ),
        forMember(
          (dest) => dest.set,
          mapFrom((source) => {
            return { id: +source.setID } as Set;
          }),
        )
      );

      // createMap(mapper, UpdateSetDto, Set);
    };
  }
}