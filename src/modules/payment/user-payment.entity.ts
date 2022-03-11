import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import { USER_PAYMENT_STATUS } from 'src/core/constants/constants';

@Table({
  tableName: 'user_payments',
})
export class UserPayment extends Model<UserPayment> {
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
    unique: true,
  })
  payment_order_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  payment_id: string;

  @Column({
    type: DataType.ENUM,
    values: [
      USER_PAYMENT_STATUS.INITIATED,
      USER_PAYMENT_STATUS.REFUNDED,
      USER_PAYMENT_STATUS.CAPTURED
    ],
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  card_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  card_type: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
