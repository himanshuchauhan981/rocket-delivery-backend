import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { ProductReviewFile } from './product-review-file.entity';

@Table({
  tableName: 'product_review',
})
export class ProductReview extends Model<ProductReview> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  headline: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  opinion: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  user_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Product)
  product_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ratings: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Order)
  order_id: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  is_deleted: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => Product)
  product: Product;

  @HasMany(() => ProductReviewFile)
  review_images: ProductReviewFile[];

  @Column({
    type: DataType.VIRTUAL,
  })
  average_ratings: string;

  @BelongsTo(() => User)
  user: User;
}
