import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'product_description',
})
export class ProductDescription extends Model<ProductDescription> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
  })
  benefits: string[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ingredients: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
  })
  features: string[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
