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

import { Product } from './product.entity';

@Table({
  tableName: 'product_price',
})
export class ProductPrice extends Model<ProductPrice> {
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
  @ForeignKey(() => Product)
  product_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  actual_price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  discount: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  discount_start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  discount_end_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  discount_type: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  refundable: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
