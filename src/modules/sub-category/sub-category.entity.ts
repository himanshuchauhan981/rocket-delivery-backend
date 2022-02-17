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
import { File } from '../admin/file/file.entity';

@Table({
  tableName: 'sub_categories',
})
export class SubCategory extends Model<SubCategory> {
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
  image: File;

  @BelongsTo(() => Category)
  category: Category;
}
