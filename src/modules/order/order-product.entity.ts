import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';

import { Product } from '../product/product.entity';

@Table({
  tableName: 'order_products',
})
export class OrderProduct extends Model<OrderProduct> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  order_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => Product)
  product_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_image: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
