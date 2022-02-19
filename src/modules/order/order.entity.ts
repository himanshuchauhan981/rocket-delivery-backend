import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CONSTANTS } from 'src/core/constants/constants';

import { Address } from '../address/address.entity';
import { UserPayment } from '../payment/user-payment.entity';
import { ProductReview } from '../product-review/product-review.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { OrderProduct } from './order-product.entity';

@Table({
  tableName: 'orders',
})
export class Order extends Model<Order> {
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
  order_number: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  user_id: number;

  @Column({
    type: DataType.ENUM,
    values: [
      CONSTANTS.REQUESTED,
      CONSTANTS.CONFIRMED,
      CONSTANTS.DELIVERED,
      CONSTANTS.CANCELLED,
    ],
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  delivery_charges: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payment_method: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  net_amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Address)
  user_address: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  delivery_date: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @ForeignKey(() => UserPayment)
  user_payment_id: number;

  @Column({
    type: DataType.ENUM,
    values: [
      CONSTANTS.PENDING,
      CONSTANTS.CONFIRMED,
      CONSTANTS.PICKED,
      CONSTANTS.ON_THE_WAY,
      CONSTANTS.DELIVERED,
    ],
    defaultValue: CONSTANTS.PENDING,
  })
  delivery_status: string;

  @Column({
    type: DataType.ENUM,
    values: [CONSTANTS.PAID, CONSTANTS.UNPAID],
    defaultValue: CONSTANTS.UNPAID,
  })
  payment_status: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => OrderProduct)
  order_products: OrderProduct;

  @BelongsTo(() => Address)
  address: Address;

  @BelongsTo(() => UserPayment)
  payment: UserPayment;

  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
  })
  product_id: number;

  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
  })
  product: Product;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ProductReview)
  product_review: ProductReview[];
}
