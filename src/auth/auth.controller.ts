import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/auth.dto';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() request: RegisterUserDto) {
    return this.authService.register(request);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportLocalGuard)
  @Post('login')
  login(@Request() request) {
    return request.user;
  }
}
