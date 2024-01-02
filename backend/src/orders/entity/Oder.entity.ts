import { Table, Column, Model, ForeignKey, HasMany, BelongsTo} from 'sequelize-typescript';
import { UserEntity } from 'src/users/entity/user.entity';
@Table
export class OrderEntity extends Model {
    @Column
    title: string;
    @Column
    body: string;
    @ForeignKey(() => UserEntity)
    @Column({field: 'userId'})
    userId: string;
    @BelongsTo(() => UserEntity)
    user: UserEntity;

}