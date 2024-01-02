import { Injectable } from '@nestjs/common';
import {UserEntity} from "./entity/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {NOT_FOUND} from "./user.errors";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserEntity) private readonly userModel) {
    }
    async create({ firstName, lastName}: CreateUserDto): Promise<void> {
        return this.userModel.create({
            firstName,
            lastName
        });
    }
    async findAll(): Promise<UserEntity[]> {
        return this.userModel.findAll();
    }
    async findOne(id: string): Promise<UserEntity> {
        return this.userModel.findOne({
           where: {
               id
           }
        });
    }
    async remove(id: string): Promise<void> {
        const findUser = await this.findOne(id);
        if(!findUser) {
            throw new Error(NOT_FOUND);
        }
        return findUser.destroy();
    }
}
