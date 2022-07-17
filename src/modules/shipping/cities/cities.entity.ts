import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { States } from '../states/states.entity';

@Table({
  tableName: 'cities',
})
export class Cities extends Model<Cities> {
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
  @ForeignKey(() => States)
  state_id: number;

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

  @BelongsTo(() => States)
  state: States;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
