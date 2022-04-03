import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { USER_TYPE } from 'src/core/constants/constants';

@Table({
  tableName: 'notification_user',
})
export class NotificationUser extends Model<NotificationUser> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  notification_id: number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.ENUM,
    values: [
      USER_TYPE.ADMIN,
      USER_TYPE.USER,
    ]
  })
  user_type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  is_read: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  is_sent: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
