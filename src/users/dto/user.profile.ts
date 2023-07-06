import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  typeConverter,
} from '@automapper/core';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ReadUserDto } from './read-user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateUserDto,
        User,
        typeConverter(String, Date, (date) => {
          // 2023-07-30
          console.log(date);
          // date = '2023-07-30';
          const [year, month, day] = date.split('-');
          return new Date(Number(year), Number(month) - 1, Number(day));
        }),
        forMember(
          (destination) => destination.password,
          mapFrom((source) => {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(source.password, salt);
          }),
        ),
      );
      createMap(
        mapper,
        User,
        ReadUserDto,
        typeConverter(Date, String, (date) => {
          // 2023-07-30
          // console.log(date);
          // date = '2023-07-30';
          // const [year, month, day] = date.split('-');
          return `${date.getFullYear()}-${
            date.getMonth() + 1 < 9
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1
          }-${
            date.getDate() + 1 < 9
              ? `0${date.getDate() + 1}`
              : date.getDate() + 1
          }`;
        }),
        forMember(
          (destination) => destination.fullName,
          mapFrom((source) => source.firstName + ' ' + source.lastName),
        ),
      );
      // createMap(mapper, InventoryItemCreateDTO, InventoryItem, forMember((dest) => dest.id, ignore()));
      // createMap(mapper, InventoryItemUpdateDTO, InventoryItem);
    };
  }
}
