import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.model';

import { path } from 'app-root-path';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Post, User]),
    ServeStaticModule.forRoot({
      rootPath: `${path}`,
      serveRoot: '/',
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
  exports: [SequelizeModule.forFeature([Post]), PostsService],
})
export class PostsModule {}
