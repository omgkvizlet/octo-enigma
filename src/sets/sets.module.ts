import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Set])],
  controllers: [SetsController],
  providers: [SetsService],
})
export class SetsModule {}
