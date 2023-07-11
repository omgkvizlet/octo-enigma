import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Request,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/entities/user.entity';
import { Code } from 'typeorm';

@Controller('sets')
@UseGuards(AuthGuard)
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  user = (req: Request) => req['user'] as User;

  @Post()
  create(@Body() createSetDto: CreateSetDto, @Req() req: Request) {
    return this.setsService.create(createSetDto, req['user']);
  }

  @Get()
  findAll(@Query('name') name: string, @Req() req: Request) {
    if (name) {
      return this.setsService.findOneByNameAndUser(name, this.user(req));
    }
    return this.setsService.findAll(this.user(req));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.setsService.findOne(+id, this.user(req));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSetDto: UpdateSetDto,
    @Req() req: Request,
  ) {
    return this.setsService.update(+id, updateSetDto, this.user(req));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req: Request) {
    await this.setsService.remove(+id, this.user(req));
  }
}
