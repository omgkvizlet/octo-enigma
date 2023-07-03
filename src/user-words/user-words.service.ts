import { Injectable } from '@nestjs/common';
import { CreateUserWordDto } from './dto/create-user-word.dto';
import { UpdateUserWordDto } from './dto/update-user-word.dto';

@Injectable()
export class UserWordsService {
  create(createUserWordDto: CreateUserWordDto) {
    return 'This action adds a new userWord';
  }

  findAll() {
    return `This action returns all userWords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userWord`;
  }

  update(id: number, updateUserWordDto: UpdateUserWordDto) {
    return `This action updates a #${id} userWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} userWord`;
  }
}
