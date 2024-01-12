import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { writeFile } from 'fs-extra';
import path from 'path';
import { Op } from 'sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private readonly postRep: typeof Post) {}
  async isResolved(): Promise<{ count: number; rows: Post[] }> {
    return this.postRep.findAndCountAll({
      where: { isResolved: true },
    });
  }

  async isPublished(): Promise<{ count: number; rows: Post[] }> {
    return this.postRep.findAndCountAll({
      where: { isPublished: true },
    });
  }

  async findOneByName(name: string): Promise<Post> {
    return this.postRep.findOne({
      where: { name },
    });
  }

  async searchByString(str: string): Promise<{ count: number; rows: Post[] }> {
    return this.postRep.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
  async findAll(): Promise<Post[]> {
    return this.postRep.findAll<Post>();
  }

  async findOne(id: number): Promise<Post> {
    const product = await this.postRep.findByPk<Post>(id);

    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async create(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ): Promise<Post> {
    const extension = file.originalname.split('.');
    const filePath =
      path +
      `/uploads/${createPostDto?.userId}/posts/` +
      '.' +
      file.filename +
      extension[extension.length - 1];
    await writeFile(filePath, file.buffer);
    const product = await this.postRep.create({
      title: createPostDto.title,
      userId: createPostDto?.userId,
      description: createPostDto.description,
      isResolved: createPostDto.isResolved ?? false,
      isPublished: createPostDto.isPublished ?? false,
      picture: filePath,
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdatePostDto): Promise<Post> {
    await this.postRep.findByPk(id);
    const product = await this.findOne(id);
    await this.postRep.update(updateProductDto, {
      where: { id: id },
    });
    return product;
  }

  async remove(id: number): Promise<Post> {
    const product = await this.findOne(id);
    await this.postRep.destroy({ where: { id: id } });
    return product;
  }
}
