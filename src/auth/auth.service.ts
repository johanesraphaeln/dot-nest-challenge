import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async register(data: RegisterUserDto) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Confirm password not matched');
    }

    const userExist = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (userExist) {
      throw new BadRequestException('Email already used');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
    delete user.password;

    return user;
  }

  async login(data: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException('Username or password is invalid');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Username or password is invalid');
    }

    const tokenPayload = {
      sub: user.id,
      username: user.email,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken: accessToken,
    };
  }
}
