import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interaction } from './entities/interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interaction])],
  controllers: [InteractionsController],
  providers: [InteractionsService],
})
export class InteractionsModule {}
