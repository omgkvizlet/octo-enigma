import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
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

    const res = await this.setsRepository.findOne({
      where: { name: set.name, authors: { id: user.id } },
    });

    if (res !== null) {
      throw new HttpException(
        'Set with this name already exists',
        HttpStatus.CONFLICT,
      );
    }

    const saved = await this.setsRepository.save(set);

    await this.wordsService.saveRaw(
      set.words.map((e): Word => {
        return { ...e, set: saved };
      }),
    );

    return saved;
    // return set;
  }

  findAll(user: User) {
    return this.setsRepository.find({
      where: {
        authors: { id: user.id },
      },
    });
  }

  findOne(id: number, user: User) {
    return this.setsRepository.findOneOrFail({
      where: { id, authors: { id: user.id } },
      // relations: ['authors'],
    });
    // return this.setsRepository
    //   .createQueryBuilder('sets')
    //   .leftJoin('sets.authors', 'users')
    //   .where('users.id = :userID', { userID: user.id })
    //   .getOneOrFail();
  }

  findOneByNameAndUser(name: string, user: User) {
    return this.setsRepository.findOneOrFail({
      where: { name, authors: { id: user.id } },
    });
  }

  async update(
    id: number,
    updateSetDto: UpdateSetDto,
    user: User,
  ): Promise<Set> {
    // console.log(updateSetDto);

    const set = await this.findOne(id, user);

    const mappedSet = await this.classMapper.mapAsync(
      updateSetDto,
      UpdateSetDto,
      Set,
    );

    await this.setsRepository.update({ id }, mappedSet);

    return set;
  }

  async remove(id: number, user: User) {
    await this.findOne(id, user);

    return this.setsRepository.delete({ id });
  }
}
