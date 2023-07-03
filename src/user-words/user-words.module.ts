import { Module } from '@nestjs/common';
import { UserWordsService } from './user-words.service';
import { UserWordsController } from './user-words.controller';

@Module({
  controllers: [UserWordsController],
  providers: [UserWordsService]
})
export class UserWordsModule {}
