import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { SingleWordDto } from './single-word.dto';
import { Word } from '../entities/word.entity';
import { CreateWordDto } from './create-word.dto';
import { Set } from '../../sets/entities/set.entity';

@Injectable()
export class WordProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, SingleWordDto, Word);

      createMap(
        mapper,
        CreateWordDto,
        Word,
        forMember(
          (dest) => dest.set,
          mapFrom((source) => {
            return { id: source.setID } as Set;
          }),
        ),
      );

      // createMap(mapper, UpdateSetDto, Set);
    };
  }
}
