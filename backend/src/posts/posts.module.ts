import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Post, User])],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
  exports: [SequelizeModule.forFeature([Post]), PostsService],
})
export class PostsModule {}
