import { Table, Column, Model, HasMany} from 'sequelize-typescript';
import { OrderEntity } from 'src/orders/entity/Oder.entity';
@Table
export class UserEntity extends Model {
    @Column
    firstName: string;
    @Column
    lastName: string;
    @Column({defaultValue: false})
    isActive: boolean;
    @HasMany(() => OrderEntity)
    orders: OrderEntity;
}