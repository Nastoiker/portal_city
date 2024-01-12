import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { USER_NOT_FOUND_ERROR } from 'src/auth/auth.constants';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UsersService,
  ) {}
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Req() request,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    picture: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userEmail: string = request.user.email;
    const user: User = await this.userService.findOneOptions({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR + userEmail);
    }
    createPostDto.userId = user.id;
    return this.postService.create(createPostDto, picture);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateProductDto: UpdatePostDto) {
    return this.postService.update(id, updateProductDto);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }
  @Get()
  getPosts() {
    return this.postService.findAll();
  }
}
