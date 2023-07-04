import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOneByOrFail({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log(hash);

    return this.usersRepository.save({
      username,
      password: hash,
      firstName: 'John',
      lastName: 'Bobr',
      birthDate: new Date(1488, 7, 14),
    });
  }
}
