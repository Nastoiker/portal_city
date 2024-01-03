<<<<<<< HEAD
import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserEntity} from "./entity/user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.create(createUserDto);
    }
=======
import { Controller } from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
 constructor(private readonly usersService: UsersService) {
 }
>>>>>>> 678ffbd (some)
}
