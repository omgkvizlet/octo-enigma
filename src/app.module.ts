import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SetsModule } from './sets/sets.module';
import { WordsModule } from './words/words.module';
import { UserWordsModule } from './user-words/user-words.module';
import { InteractionsModule } from './interactions/interactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Set } from './sets/entities/set.entity';
import { Word } from './words/entities/word.entity';
import { UserWord } from './user-words/entities/user-word.entity';
import { Interaction } from './interactions/entities/interaction.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { APP_FILTER } from '@nestjs/core';
import { NotfoundFilter } from './notfound.filter';

@Module({
  imports: [
    UsersModule,
    SetsModule,
    WordsModule,
    UserWordsModule,
    InteractionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'kurwadb',
      entities: [User, Set, Word, UserWord, Interaction],
      synchronize: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: NotfoundFilter,
    },
  ],
})
export class AppModule {}
