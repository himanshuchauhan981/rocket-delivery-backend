import {
	Table,
	Column,
	Model,
	DataType,
	CreatedAt,
	UpdatedAt,
} from 'sequelize-typescript';
  
  
@Table({
	tableName: 'orders',
})
export class Order extends Model<Order> {
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
	order_number: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	user_id: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	status: number;

	@Column({
			type: DataType.INTEGER,
			allowNull: false,
		})
	delivery_charges: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	payment_method: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	amount: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	net_amount: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	user_address: number;

	@Column({
		type: DataType.DATE,
		allowNull: true
	})
	delivery_date: string;
	
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	payment_id: string;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;
}
  