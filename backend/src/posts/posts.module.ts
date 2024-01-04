import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [SequelizeModule.forFeature([Post])],
})
export class PostsModule {}
