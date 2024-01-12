import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { ALREADY_REGISTER_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<User> {
    const oldUser = await this.userService.findOneOptions({
      where: { email: dto.email },
    });
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTER_ERROR);
    }
    return this.authService.createUser(dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { username, password }: AuthDto) {
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user.email);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('authByJwt')
  @UseGuards(JwtAuthGuard)
  async authByJwt(@Req() query) {
    const user = await this.authService.authByJwt(query.user.email);
    return user;
  }
}
