import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SetsModule } from './sets/sets.module';
import { WordsModule } from './words/words.module';
import { UserWordsModule } from './user-words/user-words.module';
import { InteractionsModule } from './interactions/interactions.module';
import { InteractionsModule } from './interactions/interactions.module';

@Module({
  imports: [UsersModule, SetsModule, WordsModule, UserWordsModule, InteractionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
