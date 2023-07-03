import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserWordsService } from './user-words.service';
import { CreateUserWordDto } from './dto/create-user-word.dto';
import { UpdateUserWordDto } from './dto/update-user-word.dto';

@Controller('user-words')
export class UserWordsController {
  constructor(private readonly userWordsService: UserWordsService) {}

  @Post()
  create(@Body() createUserWordDto: CreateUserWordDto) {
    return this.userWordsService.create(createUserWordDto);
  }

  @Get()
  findAll() {
    return this.userWordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userWordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserWordDto: UpdateUserWordDto) {
    return this.userWordsService.update(+id, updateUserWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userWordsService.remove(+id);
  }
}
