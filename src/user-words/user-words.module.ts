import { Module } from '@nestjs/common';
import { UserWordsService } from './user-words.service';
import { UserWordsController } from './user-words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { UserWordProfile } from './dto/user-word.profile';
import { Word } from '../words/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWord, Word])],
  controllers: [UserWordsController],
  providers: [UserWordsService, UserWordProfile],
})
export class UserWordsModule {}
