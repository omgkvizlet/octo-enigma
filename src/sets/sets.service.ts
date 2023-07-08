import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Set } from './entities/set.entity';
import { Word } from '../words/entities/word.entity';
import { WordsService } from '../words/words.service';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(Set) private setsRepository: Repository<Set>,
    private readonly wordsService: WordsService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async create(createSetDto: CreateSetDto, user: User): Promise<Set> {
    const mappedSet = await this.classMapper.mapAsync(
      createSetDto,
      CreateSetDto,
      Set,
    );

    const set: Set = { ...mappedSet, authors: [user] };

    console.log(set.words);

    const saved = await this.setsRepository.save(set);

    await this.wordsService.saveRaw(
      set.words.map((e): Word => {
        return { ...e, set: saved };
      }),
    );

    return saved;
    // return set;
  }

  findAll() {
    return `This action returns all sets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} set`;
  }

  update(id: number, updateSetDto: UpdateSetDto) {
    return `This action updates a #${id} set`;
  }

  remove(id: number) {
    return `This action removes a #${id} set`;
  }
}
