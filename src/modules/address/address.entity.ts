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
import { Cities } from '../shipping/cities/cities.entity';

import { States } from '../shipping/states/states.entity';
import { User } from '../user/user.entity';

@Table({
  tableName: 'address',
})
export class Address extends Model<Address> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  @ForeignKey(() => User)
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pincode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  house_no: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  area: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  country_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => States)
  state_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Cities)
  city_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  landmark: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  latitude: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  longitude: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mobile_number: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  is_deleted: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => States)
  state: States;

  @BelongsTo(() => Cities)
  city: Cities;
}
