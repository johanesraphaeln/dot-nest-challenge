import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsStrongPassword()
  password: string;

  @IsStrongPassword()
  confirmPassword: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
