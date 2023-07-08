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
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createSetDto: CreateSetDto, @Req() req: Request) {
    return this.setsService.create(createSetDto, req['user']);
  }

  @Get()
  findAll(@Query('name') name: string) {
    if (name) {
      return this.setsService.findOneByName(name);
    }
    return this.setsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
    return this.setsService.update(+id, updateSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setsService.remove(+id);
  }
}
