import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  create(@Body() createInteractionDto: CreateInteractionDto) {
    return this.interactionsService.create(createInteractionDto);
  }

  @Get()
  findAll() {
    return this.interactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteractionDto: UpdateInteractionDto) {
    return this.interactionsService.update(+id, updateInteractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionsService.remove(+id);
  }
}
