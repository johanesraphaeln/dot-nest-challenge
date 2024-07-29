import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerForm: RegisterUserDto) {
    console.log(registerForm);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginForm: LoginUserDto) {
    console.log(loginForm);
  }
}
