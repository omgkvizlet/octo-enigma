import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserWordDto } from './dto/create-user-word.dto';
import { UpdateUserWordDto } from './dto/update-user-word.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserWord } from './entities/user-word.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateWordDto } from '../words/dto/create-word.dto';
import { Word } from '../words/entities/word.entity';
import { Set } from '../sets/entities/set.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UserWordsService {
  constructor(
    @InjectRepository(UserWord) private userWordsRepo: Repository<UserWord>,
    @InjectRepository(Word) private wordsRepo: Repository<Word>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Set) private setsRepo: Repository<Set>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async add(createUserWordDto: CreateUserWordDto, userID: number) {
    // TODO set word & user check

    const uw = this.classMapper.map(
      createUserWordDto,
      CreateUserWordDto,
      UserWord,
    );

    await this.setsRepo.findOneByOrFail({ id: +createUserWordDto.setID });

    uw.user = await this.usersRepo.findOneByOrFail({ id: +userID });

    console.log(uw);

    return await this.userWordsRepo.save(uw);
  }

  async addFromSet(setID: number, userID: number) {
    // TODO request user
    const words = await this.wordsRepo.findBy({ set: { id: setID } });

    const uw = words.map((w) => {
      return { word: w, set: w.set, user: { id: userID } } as UserWord;
    });

    return await this.userWordsRepo.save(uw);
  }

  findAllByUserId(userId: number) {
    return `This action returns all userWords`;
  }

  findAllBySet(id: number) {
    return `This action returns a #${id} userWord`;
  }

  update(id: number, updateUserWordDto: UpdateUserWordDto) {
    return `This action updates a #${id} userWord`;
  }

  async getSetsListByUserID(userID: number, isOwner: boolean) {
    // TODO !!! #1 task: user lib

    console.log({ userID });

    await this.usersRepo.findOneByOrFail({ id: +userID });

    const res = (
      await this.userWordsRepo.find({
        relations: ['set', 'user'],
        where: {
          user: { id: userID },
          ...(!isOwner && { set: { isPrivate: false } }),
        },
      })
    ).map((val) => val?.set);

    // if (res.length === 0) {
    //   throw new NotFoundException('No sets by user find');
    // }

    return res;
    // .where('userWords.setId', `${id}`);
  }

  removeBySet(id: number) {
    return `This action removes a #${id} userWord`;
  }
}
