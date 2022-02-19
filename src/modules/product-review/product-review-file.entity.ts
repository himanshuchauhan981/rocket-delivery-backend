import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { ProductReview } from './product-review.entity';

@Table({
  tableName: 'product_review_file',
})
export class ProductReviewFile extends Model<ProductReviewFile> {
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
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => ProductReview)
  review_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_product_id: number;

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
