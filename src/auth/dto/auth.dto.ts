import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsStrongPassword()
  confirmPassword: string;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;
}
