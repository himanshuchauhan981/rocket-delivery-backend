import Sequelize from 'sequelize';

export default class Orders extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				order_number: {
					type: DataTypes.STRING,
					required: true,
					allowNull: true,
				},
				user_id: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				status: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				delivery_charges: {
					type: DataTypes.FLOAT(20, 2),
					required: true,
					allowNull: true,
				},
				payment_method: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				payment_id: {
					type: DataTypes.STRING,
					required: false,
					allowNull: true,
				},
				amount: {
					type: DataTypes.FLOAT(20, 2),
					required: true,
					allowNull: false,
				},
				net_amount: {
					type: DataTypes.FLOAT(20, 2),
					required: true,
					allowNull: true,
				},
				user_address: {
					type: DataTypes.INTEGER,
					required: true,
					allowNull: false,
				},
				delivery_date: {
					type: 'TIMESTAMP',
					allowNull: true,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
			},
			{ timestamps: false, tableName: 'orders', sequelize }
		);
	}
}
