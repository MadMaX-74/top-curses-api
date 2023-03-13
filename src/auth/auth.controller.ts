import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_RIGISTERED_ERROR } from './auth.constance';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_RIGISTERED_ERROR);
    }
    return this.authService.creatUser(dto)
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);

    return this.authService.login(email)
  }
}
