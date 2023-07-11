import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Set } from '../sets/entities/set.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private wordsRepository: Repository<Word>,
    @InjectRepository(Set) private setRepository: Repository<Set>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async create(createWordDto: CreateWordDto, user: User) {
    const set = await this.setRepository.findOneOrFail({
      where: { id: createWordDto.setID, authors: { id: user.id } },
    });

    if (!set) {
      throw new NotFoundException('No set by given ID');
    }

    // console.log();
    return {
      ...(await this.wordsRepository.save(
        this.classMapper.map(createWordDto, CreateWordDto, Word),
      )),
      set,
    };
  }

  saveRaw(words: Word[]) {
    return this.wordsRepository.save(words);
  }

  findAll() {
    return `This action returns all words`;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
