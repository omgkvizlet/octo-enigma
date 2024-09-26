import { forwardRef, Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { WordProfile } from './dto/word.profile';
import { SetsModule } from '../sets/sets.module';
import { Set } from '../sets/entities/set.entity';
import { UserWordsService } from '../user-words/user-words.service';

// TODO from set repo to set service
// TODO All operations with sets should be performed in sets module !!!!!!!!!!!!!!!
@Module({
  imports: [TypeOrmModule.forFeature([Word, Set])],
  controllers: [WordsController],
  providers: [WordsService, WordProfile],
  exports: [WordsService],
})
export class WordsModule {}
