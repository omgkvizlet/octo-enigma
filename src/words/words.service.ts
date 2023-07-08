import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Word } from "./entities/word.entity";
import { Repository } from "typeorm";

@Injectable()
export class WordsService {

  constructor(@InjectRepository(Word) private wordsRepository: Repository<Word>) {
  }

  create(createWordDto: CreateWordDto) {
    return 'This action adds a new word';
  }

  saveRaw(words: Word[]) {
    return this.wordsRepository.save(words);
  }

  findAll() {
    return `This action returns all words`;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
