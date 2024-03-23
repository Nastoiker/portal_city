import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostsService } from '../posts.service';

@Injectable()
export class PostsAccessGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Получаем пользователя из запроса (предполагается, что он уже аутентифицирован)
    const postId = request.params.id; // ID поста, который пытаются удалить

    return this.validateRequest(user, postId);
  }

  async validateRequest(user, postId): Promise<boolean> {
    const post = await this.postsService.findOne(postId);

    if (!post) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }

    if (post.userId !== user?.id) {
      throw new UnauthorizedException(
        'You do not have permission to delete this post',
      );
    }

    return true;
  }
}
