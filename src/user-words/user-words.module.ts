import { Module } from '@nestjs/common';
import { UserWordsService } from './user-words.service';
import { UserWordsController } from './user-words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { UserWordProfile } from './dto/user-word.profile';
import { Word } from '../words/entities/word.entity';
import { Set } from 'src/sets/entities/set.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserWord, Word, Set, User]), UsersModule],
  controllers: [UserWordsController],
  providers: [UserWordsService, UserWordProfile],
  exports: [UserWordsService],
})
export class UserWordsModule {}
