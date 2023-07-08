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
import { SingleWordDto } from "./single-word.dto";
import { Word } from "../../words/entities/word.entity";

@Injectable()
export class SetProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, SingleWordDto, Word);

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
        // typeConverter(String, Date, (date) => {
        //   // 2023-07-30
        //   console.log(date);
        //   // date = '2023-07-30';
        //   const [year, month, day] = date.split('-');
        //   return new Date(Number(year), Number(month) - 1, Number(day));
        // }),
        // forMember(
        //   (destination) => destination.password,
        //   mapFrom((source) => {
        //     const salt = bcrypt.genSaltSync(10);
        //     return bcrypt.hashSync(source.password, salt);
        //   }),
        // ),
      );

      // createMap(
      //   mapper,
      //   User,
      //   ReadUserDto,
      //   typeConverter(Date, String, (date) => {
      //     // 2023-07-30
      //     // console.log(date);
      //     // date = '2023-07-30';
      //     // const [year, month, day] = date.split('-');
      //     return `${date.getFullYear()}-${
      //       date.getMonth() + 1 < 9
      //         ? `0${date.getMonth() + 1}`
      //         : date.getMonth() + 1
      //     }-${
      //       date.getDate() + 1 < 9
      //         ? `0${date.getDate() + 1}`
      //         : date.getDate() + 1
      //     }`;
      //   }),
      //   forMember(
      //     (destination) => destination.fullName,
      //     mapFrom((source) => source.firstName + ' ' + source.lastName),
      //   ),
      // );
      // createMap(mapper, InventoryItemCreateDTO, InventoryItem, forMember((dest) => dest.id, ignore()));
      // createMap(mapper, InventoryItemUpdateDTO, InventoryItem);
    };
  }
}
