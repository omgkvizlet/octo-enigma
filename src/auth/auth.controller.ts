import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(
      createUserDto.username,
      createUserDto.password,
    );
  }
}
