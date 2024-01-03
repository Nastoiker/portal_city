import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entity/user.entity';

@Module({
    imports: [SequelizeModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [
    UsersService
    ],
})
export class UsersModule {
=======
import {UsersService} from "./users.service";

@Module({
    imports:[
    ],
    providers: [
        UsersService
    ],

})
export class UsersModule {

>>>>>>> 678ffbd (some)
}
