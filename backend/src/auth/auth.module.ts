import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { getJwtConfig } from 'src/configuration/jwt.config';
import { Post } from 'src/posts/post.model';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User, Post]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [AuthService, UsersService, PostsService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
