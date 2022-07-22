import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  UpdatedAt,
  HasOne,
  HasMany,
} from 'sequelize-typescript';

import {
  PAYMENT_METHOD_SLUG,
  STOCK_VISIBILITY_SLUG,
} from 'src/core/constants/constants';
import { File } from '../admin/file/file.entity';
import { Category } from '../category/category.entity';
import { MeasuringUnit } from '../measuring-unit/measuring-unit.entity';
import { OrderProduct } from '../order/order-product.entity';
import { ProductReview } from '../product-review/product-review.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { ProductDescription } from './product-description.entity';
import { ProductPrice } from './product-price.entity';

@Table({
  tableName: 'products',
})
export class Product extends Model<Product> {
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
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @ForeignKey(() => File)
  image_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => Category)
  category_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  @ForeignKey(() => SubCategory)
  sub_category_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  max_quantity: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => MeasuringUnit)
  measuring_unit_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => ProductDescription)
  description_id: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  is_active: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  is_deleted: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  minimum_cart_quantity: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  maximum_cart_quantity: number;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [
      STOCK_VISIBILITY_SLUG.HIDE_STOCK,
      STOCK_VISIBILITY_SLUG.STOCK_QUANTITY,
      STOCK_VISIBILITY_SLUG.STOCK_TEXT,
    ],
  })
  stock_visibility: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [
      PAYMENT_METHOD_SLUG.CASH_ON_DELIVERY,
      PAYMENT_METHOD_SLUG.DEBIT_OR_CREDIT,
      PAYMENT_METHOD_SLUG.BOTH,
    ],
  })
  payment_method: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => File)
  file: File;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => SubCategory)
  subCategory: SubCategory;

  @HasOne(() => ProductPrice)
  product_price: ProductPrice;

  @BelongsTo(() => MeasuringUnit)
  measurementUnit: MeasuringUnit;

  @Column({
    type: DataType.VIRTUAL,
  })
  total_orders: number;

  @Column({
    type: DataType.VIRTUAL,
  })
  quantity: number;

  @HasMany(() => ProductReview)
  product_review: ProductReview[];

  @Column({
    type: DataType.VIRTUAL,
  })
  average_ratings: number;

  @HasMany(() => OrderProduct)
  orderProducts: OrderProduct[];

  @BelongsTo(() => ProductDescription)
  product_description: ProductDescription;

  @Column({
    type: DataType.VIRTUAL,
  })
  available_quantity: number;
}
