import Sequelize from 'sequelize';

class UserPayments extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				payment_order_id: {
					type: DataTypes.STRING,
					required: true,
					allowNull: false,
				},
				payment_id: {
					type: DataTypes.STRING,
					required: false,
					allowNull: true,
				},
				status: {
					type: DataTypes.INTEGER,
					defaultValue: 0,
					required: true,
				},
				created_at: {
					type: 'TIMESTAMP',
					defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
					allowNull: false,
				},
				card_number: {
					type: DataTypes.STRING,
					required: false,
					allowNull: true,
				},
				card_type: {
					type: DataTypes.STRING,
					required: false,
					allowNull: true,
				},
			},
			{ timestamps: false, tableName: 'user_payments', sequelize }
		);
	}
}

export default UserPayments;
