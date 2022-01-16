import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  UpdatedAt,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';

import { File } from '../file/file.entity';
import { SubCategory } from '../sub-category/sub-category.entity';

@Table({
  tableName: 'products',
})
export class Product extends Model<Product> {
  @Column({
    type: DataType.BIGINT,
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
    type: DataType.BIGINT,
    allowNull: false,
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
    allowNull: false,
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
  purchase_limit: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  measuring_unit_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  is_active: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  is_deleted: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => File)
  Image: File;
}
