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

import { USER_TYPE } from '../../../core/constants/constants';
import { NotificationTemplate } from './notification-template.entity';

@Table({
  tableName: 'notification',
})
export class Notification extends Model<Notification> {
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
  user_id: number;

  @Column({
    type: DataType.ENUM,
    values: [USER_TYPE.ADMIN, USER_TYPE.USER],
    allowNull: false,
  })
  user_type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  is_deleted: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  metadata: any;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: any;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => NotificationTemplate)
  notification_template_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => NotificationTemplate)
  notificationTemplate: NotificationTemplate;
}
