import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
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
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country_code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mobile_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  is_deleted: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  otp_validity: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_image: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fcm_token: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  is_active: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
