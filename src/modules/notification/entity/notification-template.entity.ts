import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import { NOTIFICATION_TEMPLATE_SLUG } from '../../../core/constants/constants';

@Table({
  tableName: 'notification_template',
})
export class NotificationTemplate extends Model<NotificationTemplate> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [
      NOTIFICATION_TEMPLATE_SLUG.ORDER_CANCELLED,
      NOTIFICATION_TEMPLATE_SLUG.ORDER_CONFIRMED,
      NOTIFICATION_TEMPLATE_SLUG.ORDER_DELIVERED,
      NOTIFICATION_TEMPLATE_SLUG.ORDER_REQUESTED,
    ],
  })
  slug: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  is_deleted: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
