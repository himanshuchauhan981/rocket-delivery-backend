import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import { FILE_SLUGS, FILE_TYPES } from '../../../core/constants/constants';

@Table({
  tableName: 'file',
})
export class File extends Model<File> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [FILE_TYPES.IMAGE],
  })
  type: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [FILE_SLUGS.CATEGORY, FILE_SLUGS.PRODUCT, FILE_SLUGS.SUB_CATEGORY],
  })
  slug: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    defaultValue: 0,
  })
  is_deleted: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
