import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { UsersService } from './users/users.service';
<<<<<<< HEAD
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [UsersModule, OrdersModule,  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    autoLoadModels: true,
    synchronize: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
=======
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController, UsersController, OrdersController],
  providers: [AppService, OrdersService, UsersService],
>>>>>>> 678ffbd (some)
})
export class AppModule { }
