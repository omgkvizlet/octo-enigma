import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, Length } from 'class-validator';

// Map config in user.profile.ts

export class SignInDto {
  @IsNotEmpty()
  username: string;

  @Length(8)
  password: string;
}
