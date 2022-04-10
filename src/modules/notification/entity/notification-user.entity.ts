import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { USER_TYPE } from 'src/core/constants/constants';
import { User } from 'src/modules/user/user.entity';
import { Notification } from './notification.entity';

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
  @ForeignKey(() => Notification)
  notification_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  user_id: number;

  @Column({
    type: DataType.ENUM,
    values: [USER_TYPE.ADMIN, USER_TYPE.USER],
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

  @BelongsTo(() => Notification)
  notification: Notification;

  @BelongsTo(() => User)
  user: User;
}
