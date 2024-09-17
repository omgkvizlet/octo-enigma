import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserWordsService {
  constructor(
    @InjectRepository(UserWord) private userWordsRepo: Repository<UserWord>,
    @InjectRepository(Word) private wordsRepo: Repository<Word>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async add(createUserWordDto: CreateUserWordDto) {
    // TODO set word & user check

    const uw = this.classMapper.map(
      createUserWordDto,
      CreateUserWordDto,
      UserWord,
    );

    // console.log(uw);

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

  async findLibrarySets(id: number) {
    // TODO !!! #1 task: how to pass set & how to load it (auto/manual)

    return (
      await this.userWordsRepo.find({
        relations: ['set', 'user'],
        where: { user: { id } },
      })
    ).map((val) => val?.set);
    // .where('userWords.setId', `${id}`);
  }

  removeBySet(id: number) {
    return `This action removes a #${id} userWord`;
  }
}
