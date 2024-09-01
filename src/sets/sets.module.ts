import { forwardRef, Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';
import { SetProfile } from './dto/set.profile';
import { UsersModule } from "../users/users.module";
import { WordsModule } from "../words/words.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Set]),
    UsersModule,
    WordsModule
  ],
  controllers: [SetsController],
  providers: [SetsService, SetProfile],
})
export class SetsModule {}
