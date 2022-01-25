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
    type: DataType.DOUBLE(2,2),
    allowNull: false,
  })
  actual_price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  discount: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  discount_start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  discount_end_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
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

  @Column({
    type: DataType.VIRTUAL
  })
  discount_status: boolean;

  @Column({
    type: DataType.VIRTUAL
  })
  discount_price: number;
}
