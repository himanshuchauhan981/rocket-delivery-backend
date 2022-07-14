import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { Countries } from './countries.entity';

@Table({
  tableName: 'states',
})
export class States extends Model<States> {
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
    allowNull: false,
  })
  @ForeignKey(() => Countries)
  country_id: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  is_active: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  is_deleted: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => Countries)
  country: Countries;
}
