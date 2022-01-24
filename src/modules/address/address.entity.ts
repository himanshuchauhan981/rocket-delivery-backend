import {
	Table,
	Column,
	Model,
	DataType,
	CreatedAt,
	UpdatedAt,
} from 'sequelize-typescript';

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
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	user_id: string;

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
		type: DataType.STRING,
		allowNull: false,
	})
	city: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	state: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	landmark: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	latitude: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	longitude: number;

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
		type: DataType.INTEGER,
		defaultValue: 0,
	})
	is_deleted: number;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;
}
