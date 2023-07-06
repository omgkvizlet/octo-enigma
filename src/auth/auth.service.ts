import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { ReadUserDto } from "../users/dto/read-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  async signIn(username: string, pass: string): Promise<{ token: string }> {
    const user = await this.usersService.findOne(username);

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    return this.genToken(user);
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return {
      ...(await this.genToken(user)),
      user: await this.classMapper.mapAsync(user, User, ReadUserDto),
    };
  }

  private async genToken(user: User): Promise<{ token: string }> {
    const payload = { sub: user.id, username: user.username };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
