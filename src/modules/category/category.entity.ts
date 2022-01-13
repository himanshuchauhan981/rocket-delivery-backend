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
import { Image } from '../file/image.entity';
import { SubCategory } from '../sub-category/sub-category.entity';

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category> {
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
  @ForeignKey(() => Image)
  image_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  is_sub_category: number;

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

  @BelongsTo(() => Image)
  image: Image;

  @HasMany(() => SubCategory)
  SubCategory: SubCategory;

  @Column({
    type: DataType.VIRTUAL,
  })
  totalSubCategories: number;

  @Column({
    type: DataType.VIRTUAL,
  })
  totalProducts: number;
}
