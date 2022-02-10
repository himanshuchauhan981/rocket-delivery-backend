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
import { Product } from '../product/product.entity';

@Table({
  tableName: 'wishlist',
})
export class Wishlist extends Model<Wishlist> {
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
  user_id: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
    primaryKey: true,
  })
  is_deleted: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => Product)
  product: Product;
}
