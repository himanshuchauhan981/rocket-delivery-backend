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
import { File } from '../admin/file/file.entity';
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
  @ForeignKey(() => File)
  image_id: number;

  @Column({
    type: DataType.INTEGER,
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

  @BelongsTo(() => File)
  image: File;

  @HasMany(() => SubCategory)
  SubCategory: SubCategory;

  @Column({
    type: DataType.VIRTUAL,
  })
  subCategoriesCount: number;

  @Column({
    type: DataType.VIRTUAL,
  })
  productsCount: number;
}
