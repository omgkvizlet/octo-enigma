import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOneByOrFail({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      await this.classMapper.mapAsync(createUserDto, CreateUserDto, User),
    );
  }
}
