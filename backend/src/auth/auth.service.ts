import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async createUser(dto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const password = dto.password;
    dto.password = await hash(password, salt);
    dto.roles = 1;
    const user = { ...dto };
    try {
      const newUser = await this.usersService.create(user);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneOptions({ where: username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user && passwordValid) {
      return {
        userId: user.id,
        username: user.username,
        email: user.email,
      };
    }

    return null;
  }
  async authByJwt(email: string) {
    return this.usersService.findOneOptions({
      where: { email },
      atributtes: { exclude: ['password'] },
      relations: ['posts'],
    });
  }
  async login(email: string) {
    const payLoad = { email };
    return {
      accessToken: await this.jwtService.signAsync(payLoad, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
