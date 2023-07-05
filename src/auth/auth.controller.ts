import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from "../users/users.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
