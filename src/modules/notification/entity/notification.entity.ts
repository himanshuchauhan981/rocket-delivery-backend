import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { NOTIFICATION_TYPE, USER_TYPE } from 'src/core/constants/constants';

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
    type: DataType.STRING,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.ENUM,
    values: [
      NOTIFICATION_TYPE.ORDER_REQUEST,
      NOTIFICATION_TYPE.ORDER_CONFIRM,
      NOTIFICATION_TYPE.ORDER_CANCEL,
    ],
    allowNull: false,
  })
  notification_type: string;

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

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
