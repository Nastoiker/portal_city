import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table({ timestamps: true })
export class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => User)
  userId: number;
  @Column
  title: string;
  @Column
  description: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isResolved: boolean;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPublished: boolean;
  @Column
  picture: string;
}
