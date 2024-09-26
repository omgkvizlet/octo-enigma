import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Req, Request, NotFoundException, UseGuards,
} from '@nestjs/common';
import { UserWordsService } from './user-words.service';
import { CreateUserWordDto } from './dto/create-user-word.dto';
import { UpdateUserWordDto } from './dto/update-user-word.dto';
import { User } from '../users/entities/user.entity';
import { get } from '@automapper/core/lib/utils/get';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user-words')
@UseGuards(AuthGuard)
export class UserWordsController {
  constructor(private readonly userWordsService: UserWordsService) {}

  _getUserID(req: Request) {
    const user = req['user'] as User;

    console.log({ user });

    if (!user) throw new NotFoundException('User does not exist');

    return user.id;
  }

  @Post()
  create(@Body() createUserWordDto: CreateUserWordDto, @Req() req: Request) {
    return this.userWordsService.add(createUserWordDto, this._getUserID(req));
  }

  //
  // @Get()
  // findAll() {
  //   return this.userWordsService.findAll();
  // }
  //
  @Get('/lib/:id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    // throw new Error('GO Fuck urself');

    if (!id) {
      id = this._getUserID(req).toString();
    }

    console.log(id);

    return this.userWordsService.getSetsListByUserID(
      +id,
      this._getUserID(req) === +id,
    );
  }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserWordDto: UpdateUserWordDto) {
  //   return this.userWordsService.update(+id, updateUserWordDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userWordsService.remove(+id);
  // }
}
