import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { NOT_FOUND } from './user.errors';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel) {}
  async create(dto: CreateUserDto): Promise<User> {
    const { name, surname, username, password, roles, email } = dto;
    return this.userModel.create({
      password,
      email,
      username,
      roles,
      name,
      surname,
    });
  }
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  async findOneOptions(where: any): Promise<User> {
    return this.userModel.findOne();
  }
  async remove(id: string): Promise<void> {
    const findUser = await this.findOne(id);
    if (!findUser) {
      throw new Error(NOT_FOUND);
    }
    return findUser.destroy();
  }
}
