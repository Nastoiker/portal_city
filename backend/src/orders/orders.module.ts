import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderEntity } from './entity/Oder.entity';

@Module({
    imports: [SequelizeModule.forFeature([OrderEntity])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
